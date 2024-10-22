<?php
/**
 * The enqueue scripts class.
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
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
class ScriptsAdmin extends Scripts implements ScriptsInterface {
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
	 * Check if the current page is the plugin's admin page
	 *
	 * @since    0.1.3
	 * @param string $hook The current admin page
	 * @return bool
	 */
	private function is_admin_page( string $hook ): bool {
		return str_contains( $hook, 'settings_page_' . $this->plugin_name );
	}

	/**
	 * Localize the script with the data needed for the admin frontend
	 *
	 * @since    0.1.3
	 * @param string $handle The handle for the script
	 * @return void
	 */
	public function localize_script( string $handle ): void {
		wp_localize_script(
			$handle,
			ScriptsInterface::LOCALIZED_OBJECT_NAME,
			array(
				'nonce' => wp_create_nonce( 'wp_rest' ), // Nonce for REST API authentication (must be used in all REST API requests)
			)
		);
	}

	/**
	 * Run the editor scripts and styles
	 *
	 * @since    0.1.3
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_scripts_and_styles( string $hook ): void {
		if ( ! $this->is_admin_page( $hook ) ) {
			return;
		}

		$asset_path      = plugin_dir_path( __DIR__ ) . 'build/admin/index.asset.php';
		$style_url       = plugin_dir_url( __DIR__ ) . 'build/admin/index.css';
		$style_index_url = plugin_dir_url( __DIR__ ) . 'build/admin/style-index.css';
		$script_url      = plugin_dir_url( __DIR__ ) . 'build/admin/index.js';

		$this->enqueue_style( $asset_path, $style_url, $this->plugin_name . '-admin' );
		$this->enqueue_style( $asset_path, $style_index_url, $this->plugin_name . '-admin-style-index' );
		$this->enqueue_script( $asset_path, $script_url, $this->plugin_name . '-admin' );
		$this->localize_script( $this->plugin_name . '-admin' );
	}
}
