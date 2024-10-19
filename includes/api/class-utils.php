<?php
/**
 * The API utility functions file
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI\Api;

use Kotisivu\Gutenberg_Native_AI\Encryption;

/**
 * This class handles the API utility functions for the plugin.
 *
 * @since      0.1.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Utils {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Get ChatGPT settings from the database
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return  array
	 */
	public static function get_chatgpt_settings(): array {
		$settings = get_option(
			'gutenberg_native_ai',
			array(
				'model'   => 'gpt-4o-mini',
				'api_key' => '',
			)
		);

		$encryptor         = new Encryption();
		$decrypted_api_key = $encryptor->decrypt( $settings['api_key'] );

		return array(
			'model'   => $settings['model'],
			'api_key' => $decrypted_api_key,
		);
	}

	/**
	 * Update ChatGPT settings in the database
	 *
	 * @since   0.1.0
	 * @access  public
	 * @param   \WP_REST_Request $request Request object.
	 * @return  array
	 * @throws  \Exception          If failed to update ChatGPT settings.
	 */
	public static function update_chatgpt_settings( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );

		$current = get_option( 'gutenberg_native_ai' );

		if ( $body === $current ) {
			return $current;
		}

		$encryptor         = new \Kotisivu\Gutenberg_Native_AI\Data_Encryption();
		$encrypted_api_key = $encryptor->encrypt( $body['api_key'] ?? $current['api_key'] ?? '' );

		$update = update_option(
			'gutenberg_native_ai',
			array(
				'model'   => $body['model'] ?? $current['model'] ?? 'gpt-4o-mini',
				'api_key' => $encrypted_api_key,
			),
			true
		);

		if ( ! $update ) {
			throw new \Exception( 'Failed to update ChatGPT settings.', 500 );
		}

		return array(
			'model'   => $body['model'] ?? $current['model'] ?? 'gpt-4o-mini',
			'api_key' => $body['api_key'] ?? $current['api_key'] ?? '',
		);
	}

	/**
	 * Get content from Open AI
	 *
	 * @since 0.1.0
	 * @access public
	 * @param \WP_REST_Request $request Request object.
	 * @return Object
	 * @throws \Exception If failed to update contact information.
	 */
	public static function get_open_ai_text_content( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );
		$api  = self::get_chatgpt_settings();
		$data = array(
			'model'    => $api['model'] ?? 'gpt-4o-mini',
			'messages' => array(
				(object) array(
					'role'    => 'system',
					'content' => 'You are a helpful assistant that returns text in markdown format. Return only the result.',
				),
				(object) array(
					'role'    => 'user',
					'content' => $body['prompt'],
				),
			),
		);

		$response = wp_remote_post(
			'https://api.openai.com/v1/chat/completions',
			array(
				'method'    => 'POST',
				'body'      => wp_json_encode( $data ),
				'headers'   => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . $api['api_key'],
				),
				'sslverify' => false,
				'timeout'   => 60,
			),
		);

		if ( ! is_wp_error( $response ) ) {
			$body = json_decode( wp_remote_retrieve_body( $response ), true );
			return $body;
		} else {
			$error_message = $response->get_error_message();
			throw new \Exception( esc_html( $error_message ) );
		}
	}

	/**
	 * Get content from Open AI
	 *
	 * @since 0.1.0
	 * @access public
	 * @param \WP_REST_Request $request Request object.
	 * @return Object
	 * @throws \Exception If failed to update contact information.
	 */
	public static function get_open_ai_image_content( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );
		$api  = self::get_chatgpt_settings();
		$data = array(
			'model'           => 'dall-e-3',
			'prompt'          => $body['prompt'],
			'n'               => 1,
			'response_format' => 'b64_json',
			'size'            => '1024x1024',
		);

		$response = wp_remote_post(
			'https://api.openai.com/v1/images/generations',
			array(
				'method'    => 'POST',
				'body'      => wp_json_encode( $data ),
				'headers'   => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . $api['api_key'],
				),
				'sslverify' => false,
				'timeout'   => 60,
			),
		);

		if ( ! is_wp_error( $response ) ) {
			$body = json_decode( wp_remote_retrieve_body( $response ), true );
			return $body;
		} else {
			$error_message = $response->get_error_message();
			throw new \Exception( esc_html( $error_message ) );
		}
	}

	/**
	 * Save image to media library
	 * - Original snippet from 'cyberwani'
	 *
	 * @see https://gist.github.com/cyberwani/ad5452b040001878d692c3165836ebff
	 *
	 * @since 0.1.0
	 * @access public
	 * @param \WP_REST_Request $request Request object.
	 * @return Object
	 * @throws \Exception If failed to update contact information.
	 */
	public static function save_image_to_media_library( \WP_REST_Request $request ): array {
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$body = json_decode( $request->get_body(), true );

		$base64 = $body['base64'];

		// Upload dir.
		$upload_dir  = wp_upload_dir();
		$upload_path = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;

		$img             = str_replace( 'data:image/jpeg;base64,', '', $base64 );
		$img             = str_replace( ' ', '+', $img );
		$decoded         = base64_decode( $img ); // phpcs:ignore
		$extension       = '.jpeg';
		$file_type       = 'image/jpeg';
		$hashed_filename = md5( 'AI generated image' . microtime() ) . $extension;

		// Save the image in the uploads directory.
		// TODO: Refactor this to use WP Filesystem API.
		$upload_file = file_put_contents( $upload_path . $hashed_filename, $decoded ); // phpcs:ignore

		$attachment = array(
			'post_mime_type' => $file_type,
			'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $hashed_filename ) ),
			'post_content'   => '',
			'post_status'    => 'inherit',
			'guid'           => $upload_dir['url'] . '/' . basename( $hashed_filename ),
		);

		$attach_id = wp_insert_attachment( $attachment, $upload_dir['path'] . '/' . $hashed_filename );

		// Generate metadata and update the database.
		$attach_data = wp_generate_attachment_metadata( $attach_id, $upload_dir['path'] . '/' . $hashed_filename );
		wp_update_attachment_metadata( $attach_id, $attach_data );

		// Return the attachment ID and URL.
		return array(
			'attachment_id' => $attach_id,
			'url'           => wp_get_attachment_url( $attach_id ),
		);
	}
}