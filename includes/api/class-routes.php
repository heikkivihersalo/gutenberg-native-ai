<?php
/**
 * The main API class file
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI\Api;

/**
 * This class handles the core API functionality for the plugin.
 *
 * @since      0.1.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Routes {
	/**
	 * The base endpoint for this API.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $base The base endpoint for this API.
	 */
	protected $base;

	/**
	 * The unique identifier for this API endpoint (plugin name).
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $plugin_name The string used to uniquely identify this plugin.
	 */
	protected $name;

	/**
	 * The current version of the API endpoint.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $version The current version of the API endpoint.
	 */
	protected $version;

	/**
	 * Constructor
	 *
	 * @param string $name    The unique identifier for this API endpoint (plugin name).
	 * @param string $version The current version of the API endpoint.
	 * @return void
	 */
	public function __construct( string $name, string $version ) {
		$this->name    = $name;
		$this->version = $version;

		$this->load_dependencies();
	}

	/**
	 * Load dependencies
	 *
	 * @since 0.1.0
	 * @access private
	 * @return void
	 */
	private function load_dependencies() {
		require_once plugin_dir_path( __DIR__ ) . 'class-encryption.php';
		require_once plugin_dir_path( __FILE__ ) . 'enums/enum-permissions.php';
		require_once plugin_dir_path( __FILE__ ) . 'class-utils.php';
		require_once plugin_dir_path( __FILE__ ) . 'class-callbacks.php';
	}

	/**
	 * Register plugin API routes
	 *
	 * @since 0.1.0
	 * @access public
	 * @return void
	 */
	public function register_endpoints(): void {
		/**
		 * Route for getting ChatGPT settings
		 *
		 * @method GET
		 */
		register_rest_route(
			$this->name . '/v' . $this->version,
			'/settings',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( Callbacks::class, 'get_settings' ),
				'permission_callback' => Permissions::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for updating ChatGPT settings
		 *
		 * @method POST
		 */
		register_rest_route(
			$this->name . '/v' . $this->version,
			'/settings',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for POST transport method.
				'callback'            => array( Callbacks::class, 'update_settings' ),
				'permission_callback' => Permissions::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for generating text content
		 *
		 * @method POST
		 */
		register_rest_route(
			$this->name . '/v' . $this->version,
			'/text/generate',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( Callbacks::class, 'generate_text' ),
				'permission_callback' => Permissions::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for translating text content
		 *
		 * @method POST
		 */
		register_rest_route(
			$this->name . '/v' . $this->version,
			'/text/translate',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( Callbacks::class, 'translate_text' ),
				'permission_callback' => Permissions::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for generating image content
		 *
		 * @method POST
		 */
		register_rest_route(
			$this->name . '/v' . $this->version,
			'/image/generate',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( Callbacks::class, 'generate_image' ),
				'permission_callback' => Permissions::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for saving image to media library
		 *
		 * @method POST
		 */
		register_rest_route(
			$this->name . '/v' . $this->version,
			'/image/save',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( Callbacks::class, 'save_image_to_media_library' ),
				'permission_callback' => Permissions::ADMIN->get_callback(),
			)
		);
	}
}
