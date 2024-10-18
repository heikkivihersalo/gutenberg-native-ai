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
class Scripts {
	/**
	 * The ID of this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.0
	 * @param    string $plugin_name   The name of this plugin.
	 * @param    string $version       The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    0.1.0
	 * @access   public
	 */
	public function enqueue_styles() {
		if ( file_exists( plugin_dir_url( __DIR__ ) . 'build/ai/index.css' ) ) :
			$assets = include plugin_dir_path( __DIR__ ) . 'build/ai/index.asset.php';
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __DIR__ ) . 'build/ai/index.css', array(), $assets, 'all' );
		else :
			$notice = new Notice( __( 'Plugin stylesheet assets are missing. Run `yarn` and/or `yarn build` to generate them.', 'gutenberg-native-ai' ) );
			$notice->display();
		endif;
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    0.1.0
	 * @access   public
	 */
	public function enqueue_scripts() {
		if ( file_exists( plugin_dir_url( __DIR__ ) . 'build/ai/index.js' ) ) :
			$assets = include plugin_dir_path( __DIR__ ) . 'build/ai/index.asset.php';
			wp_enqueue_script( $this->plugin_name, plugin_dir_url( __DIR__ ) . 'build/ai/index.js', $assets['dependencies'], $assets['version'], true );
		else :
			$notice = new Notice( __( 'Plugin script assets are missing. Run `yarn` and/or `yarn build` to generate them.', 'gutenberg-native-ai' ) );
			$notice->display();
		endif;
	}
}
