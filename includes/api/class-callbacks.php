<?php
/**
 * The API callback class file
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI\Api;

/**
 * This class handles the API callbacks for the plugin.

 * @since      0.1.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Callbacks {
	/**
	 * Get ChatGPT settings
	 *
	 * @return \WP_REST_Response|\WP_Error Response object
	 */
	public function get_settings(): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::get_chatgpt_settings();
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => 'fetched_succesfully',
				'message' => __( 'Fetched succesfully', 'gutenberg-native-ai' ),
				'data'    => $result,
			),
			200
		);
	}

	/**
	 * Update ChatGPT settings
	 *
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function update_settings( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::update_chatgpt_settings( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => 'updated_succesfully',
				'message' => __( 'Updated succesfully', 'gutenberg-native-ai' ),
				'data'    => $result,
			),
			200
		);
	}

	/**
	 * Generate content through Open AI
	 *
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function generate_text( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::get_open_ai_text_content( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		return new \WP_REST_Response( $result, 200 );
	}

	/**
	 * Generate content through Open AI
	 *
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function generate_image( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::get_open_ai_image_content( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		return new \WP_REST_Response( $result, 200 );
	}

	/**
	 * Save image to media library
	 *
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function save_image_to_media_library( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::save_image_to_media_library( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		return new \WP_REST_Response( $result, 200 );
	}
}
