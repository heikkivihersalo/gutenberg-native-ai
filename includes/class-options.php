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
 * This class defines all code necessary handle the admin options area.
 *
 * @since      0.1.3
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Options {
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
}
