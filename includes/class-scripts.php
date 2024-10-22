<?php
/**
 * The enqueue scripts class.
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.3
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI;

/**
 * The enqueued scripts functionality of the plugin.
 *
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
abstract class Scripts implements ScriptsInterface {
	/**
	 * The ID of this plugin.
	 *
	 * @since    0.1.3
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    0.1.3
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 0.1.3
	 * @access public
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version The version of this plugin.
	 * @return void
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * @inheritDoc
	 */
	public function asset_exists( string $path, string $type = '' ): bool {
		if ( ! file_exists( $path ) ) :
			$message = sprintf(
				/* translators: %1$s is the type of the asset, %2$s is the path to the asset */
				__( 'Plugin%1$s assets in a path "%2$s" are missing. Run `yarn` and/or `yarn build` to generate them.', 'gutenberg-native-ai' ),
				$type ? ' ' . $type : '',
				$path
			);

			$notice = new Notice( $message );
			$notice->display();

			return false;
		endif;

		return true;
	}

	/**
	 * @inheritDoc
	 */
	public function enqueue_style( string $asset_path, string $style_url, string $handle = '' ): void {
		if ( ! $this->asset_exists( $asset_path ) ) {
			return;
		}

		$assets = include $asset_path;
		wp_enqueue_style( $handle, $style_url, array(), $assets, 'all' );
	}

	/**
	 * @inheritDoc
	 */
	public function enqueue_script( string $asset_path, string $script_url, string $handle = '' ): void {
		if ( ! $this->asset_exists( $asset_path ) ) {
			return;
		}

		$assets = include $asset_path;
		wp_enqueue_script( $handle, $script_url, $assets['dependencies'], $assets['version'], true );
	}
}
