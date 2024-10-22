<?php
/**
 * The core plugin class.
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI;

use Kotisivu\Gutenberg_Native_AI\Api\Routes;

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      0.1.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Plugin {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

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
	 * The current version of the API.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $api_version    The current version of the API.
	 */
	protected $api_version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    0.1.0
	 */
	public function __construct() {
		$this->version     = defined( 'GUTENBERG_NATIVE_AI_VERSION' ) ? GUTENBERG_NATIVE_AI_VERSION : '0.1.0';
		$this->api_version = defined( 'GUTENBERG_NATIVE_AI_API_VERSION' ) ? GUTENBERG_NATIVE_AI_API_VERSION : '1';
		$this->plugin_name = 'gutenberg-native-ai';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_scripts_and_styles();
		$this->define_options_page();
		$this->add_api_routes();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private function load_dependencies() {
		/**
		 * Load script interface
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/interfaces/interface-scripts.php';

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-i18n.php';

		/**
		* The class responsible for defining all actions that occur in the admin area.
		*/
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-scripts.php';
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-scripts-editor.php';
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-scripts-admin.php';

		/**
		 * The class responsible for loading and handling the admin options area.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-options.php';

		/**
		 * The class responsible for handling API requests.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/api/class-routes.php';

		/**
		 * The class responsible for handling plugin notice messages
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-notice.php';

		/**
		 * Finally load the loader class.
		 */
		$this->loader = new Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Gutenberg_Native_Ai_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private function set_locale() {
		$plugin_i18n = new i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Define API routes and callbacks.
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private function add_api_routes() {
		$plugin_api = new Routes( $this->get_plugin_name(), $this->get_api_version() );

		$this->loader->add_action( 'rest_api_init', $plugin_api, 'register_endpoints' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private function define_scripts_and_styles() {
		$editor_scripts = new ScriptsEditor( $this->get_plugin_name(), $this->get_version() );
		$admin_scripts  = new ScriptsAdmin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $editor_scripts, 'enqueue_scripts_and_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $admin_scripts, 'enqueue_scripts_and_styles' );
	}

	/**
	 * Register all of the hooks related to the options area functionality
	 * of the plugin.
	 *
	 * @since    0.1.3
	 * @access   private
	 */
	private function define_options_page() {
		$options = new Options( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_menu', $options, 'add_plugin_options' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    0.1.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     0.1.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     0.1.0
	 * @return    Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     0.1.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

	/**
	 * Retrieve the version number of the API.
	 *
	 * @since     0.1.0
	 * @return    string    The version number of the API.
	 */
	public function get_api_version() {
		return $this->api_version;
	}
}
