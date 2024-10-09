<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.kotisivu.dev
 * @since      1.0.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI;

/**
 * This class defines all code necessary handle the admin area.
 *
 * @since      1.0.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Admin {
	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Constructor
	 *
	 * @since    1.0.0
	 * @param string $plugin_name The string used to uniquely identify this plugin.
	 * @param string $version     The current version of the plugin.
	 */
	public function __construct( string $plugin_name, string $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Get the HTML for the theme options
	 *
	 * @return void
	 */
	public function get_html() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'You do not have sufficient permissions to access this page' );
		}

		ob_start();
		require plugin_dir_path( __DIR__ ) . 'build/admin/render.php';
		echo wp_kses( ob_get_clean(), 'post' );
	}

	/**
	 * Enqueue theme option related assets
	 *
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_scripts( $hook ) {
		if ( ! str_contains( $hook, 'toplevel_page_' . $this->plugin_name ) ) {
			return;
		}

		$assets = include plugin_dir_path( __DIR__ ) . 'build/admin/index.asset.php';

		/**
		 * Enqueue CSS modules for the admin page
		 */
		wp_enqueue_style(
			$this->plugin_name . '-admin-index',
			plugin_dir_url( __DIR__ ) . 'build/admin/index.css',
			array(),
			$assets['version'],
		);

		/**
		 * Enqueue custom styles
		 */
		wp_enqueue_style(
			$this->plugin_name . '-admin-style-index',
			plugin_dir_url( __DIR__ ) . 'build/admin/style-index.css',
			array(),
			$assets['version'],
		);

		/**
		 * Enqueue JS for the admin page
		 */
		wp_enqueue_script(
			$this->plugin_name . '-admin-index',
			plugin_dir_url( __DIR__ ) . 'build/admin/index.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);

		/**
		 * Localize the script with the data needed for the REST API
		 */
		wp_localize_script(
			$this->plugin_name . '-admin-index',
			'gutenbergNativeAiSettings',
			array(
				'nonce' => wp_create_nonce( 'wp_rest' ), // Nonce for REST API authentication (must be used in all REST API requests)
			)
		);
	}

	/**
	 * Setup theme options
	 *
	 * @return void
	 */
	public function add_menu(): void {
		/**
		 * Create initial menu page
		 */
		add_menu_page(
			__( 'Gutenberg Native AI Options', 'gutenberg-native-ai' ), // Page Title
			__( 'Gutengerg AI', 'gutenberg-native-ai' ), // Menu Title
			'manage_options', // Capability
			$this->plugin_name,  // Menu Slug
			array( $this, 'get_html' ), // Callback function
			'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTUyIDE3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjk1NjIyNywwLDAsMC45NTYyMjcsLTgxMi42NDgsLTI2MjguNzgpIj4KICAgICAgICA8cGF0aCBmaWxsPSJibGFjayIgZD0iTTkyOC44NzQsMjc0OS4xMUwxMDA3LjksMjc5NC43NEwxMDA3LjksMjg4NS45OUw5MjguODc0LDI5MzEuNjFMODQ5Ljg0OCwyODg1Ljk5TDg0OS44NDgsMjc5NC43NEw5MjguODc0LDI3NDkuMTFaTTk4OS4wMTEsMjg0OC4xM0w5ODkuMDExLDI4MzIuNTlMOTUyLjEzNSwyODAwLjk5TDk1Mi4xMzUsMjgxOC43M0w5NzUuODYzLDI4MzkuMzdMOTc1Ljg2MywyODQxLjM2TDk1Mi4xMzUsMjg2MS45OUw5NTIuMTM1LDI4NzkuNzNMOTg5LjAxMSwyODQ4LjEzWk04NjguNzM3LDI4MzIuNTlMODY4LjczNywyODQ4LjEzTDkwNS42MTMsMjg3OS43M0w5MDUuNjEzLDI4NjEuOTlMODgxLjg4NSwyODQxLjM2TDg4MS44ODUsMjgzOS4zN0w5MDUuNjEzLDI4MTguNzNMOTA1LjYxMywyODAwLjk5TDg2OC43MzcsMjgzMi41OVpNOTI0LjM4MywyODk5LjMzTDk1MS4xMjQsMjc4MS4zOUw5MzQuMjIxLDI3ODEuMzlMOTA3LjQ4LDI4OTkuMzNMOTI0LjM4MywyODk5LjMzWiIgLz4KICAgIDwvZz4KPC9zdmc+Cg==', // Icon
			50
		);
	}
}
