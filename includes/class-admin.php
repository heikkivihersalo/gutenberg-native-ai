<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI;

/**
 * This class defines all code necessary handle the admin area.
 *
 * @since      0.1.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Admin {
	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * The name of the localized object
	 *
	 * @since    0.1.3
	 * @access   protected
	 * @var      string    LOCALIZED_OBJECT_NAME    The name of the localized object
	 */
	protected const LOCALIZED_OBJECT_NAME = 'gutenbergNativeAiSettings';

	/**
	 * The admin page name
	 *
	 * @since    0.1.3
	 * @access   protected
	 * @var      string    ADMIN_PAGE_NAME    The name of the admin page
	 */
	protected const ADMIN_PAGE_NAME = 'Gutenberg Native AI';

	/**
	 * Constructor
	 *
	 * @since    0.1.0
	 * @param string $plugin_name The string used to uniquely identify this plugin.
	 * @param string $version     The current version of the plugin.
	 */
	public function __construct( string $plugin_name, string $version ) {
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
	 * Check user permissions
	 *
	 * @since    0.1.3
	 * @return void
	 */
	public function check_user_permissions(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'You do not have sufficient permissions to access this page' );
		}
	}

	/**
	 * Check if the plugin's admin assets exist and display a notice if they don't
	 *
	 * @since    0.1.3
	 * @param string $path The path to the asset
	 * @return booboolean
	 */
	public function asset_exists( string $path ): bool {
		if ( ! file_exists( $path ) ) :
			$message = sprintf(
				/* translators: The path to the missing plugin admin asset file */
				__( 'Plugin admin assets in a path "%s" are missing. Run `yarn` and/or `yarn build` to generate them.', 'gutenberg-native-ai' ),
				$path
			);

			$notice = new Notice( $message );
			$notice->display();

			return false;
		endif;

		return true;
	}

	/**
	 * Get the HTML for the theme options
	 *
	 * @since    0.1.0
	 * @return void
	 */
	public function get_admin_html(): void {
		$this->check_user_permissions(); // Check user permissions before rendering the page

		ob_start();
		require plugin_dir_path( __DIR__ ) . 'build/admin/render.php';
		echo wp_kses( ob_get_clean(), 'post' );
	}

	/**
	 * Add the plugin options page to the admin menu under `Settings`
	 *
	 * @since    0.1.3
	 * @return void
	 */
	public function add_plugin_options(): void {
		add_options_page(
			__( 'Gutenberg Native AI Options', 'gutenberg-native-ai' ), // Page Title
			self::ADMIN_PAGE_NAME, // Menu Title
			'manage_options',
			$this->plugin_name,  // Menu Slug
			array( $this, 'get_admin_html' ), // Callback function
		);
	}

	/**
	 * Register the admin styles
	 *
	 * @since    0.1.3
	 * @return void
	 */
	public function enqueue_styles(): void {
		$asset_path      = plugin_dir_path( __DIR__ ) . 'build/admin/index.asset.php';
		$style_url       = plugin_dir_url( __DIR__ ) . 'build/admin/index.css';
		$style_index_url = plugin_dir_url( __DIR__ ) . 'build/admin/style-index.css';

		if ( ! $this->asset_exists( $asset_path ) ) {
			return;
		}

		$assets = include $asset_path;
		wp_enqueue_style( $this->plugin_name . '-admin', $style_url, array(), $assets['version'] );
		wp_enqueue_style( $this->plugin_name . '-admin-style-index', $style_index_url, array(), $assets['version'] );
	}

	/**
	 * Enqueue the admin script
	 *
	 * @since    0.1.3
	 * @return void
	 */
	public function enqueue_script(): void {
		$asset_path = plugin_dir_path( __DIR__ ) . 'build/admin/index.asset.php';
		$script_url = plugin_dir_url( __DIR__ ) . 'build/admin/index.js';

		if ( ! $this->asset_exists( $asset_path ) ) {
			return;
		}

		$assets = include $asset_path;
		wp_enqueue_script( $this->plugin_name . '-admin', $script_url, $assets['dependencies'], $assets['version'], true );
	}

	/**
	 * Localize the script with the data needed for the admin frontend
	 *
	 * @since    0.1.3
	 * @return void
	 */
	public function localize_script(): void {
		wp_localize_script(
			$this->plugin_name . '-admin',
			self::LOCALIZED_OBJECT_NAME,
			array(
				'nonce' => wp_create_nonce( 'wp_rest' ), // Nonce for REST API authentication (must be used in all REST API requests)
			)
		);
	}

	/**
	 * Run the admin scripts and styles
	 *
	 * @since    0.1.3
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_admin_scripts_and_styles( string $hook ): void {
		if ( ! $this->is_admin_page( $hook ) ) {
			return;
		}

		$this->enqueue_styles();
		$this->enqueue_script();
		$this->localize_script();
	}
}
