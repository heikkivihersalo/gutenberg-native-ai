<?php
/**
 * The plugin bootstrap file
 *
 * @link              https://www.kotisivu.dev
 * @since             0.1.0
 * @package           Gutenberg_Native_Ai
 *
 * @wordpress-plugin
 * Plugin Name:       Gutenberg Native AI (Beta)
 * Plugin URI:        https://www.kotisivu.dev
 * Description:       A plugin that extends the Gutenberg editor with AI features designed to work natively with WordPress.
 * Version:           0.1.2
 * Author:            Heikki Vihersalo
 * Author URI:        https://www.kotisivu.dev/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gutenberg-native-ai
 * Domain Path:       /languages
 * Requires at least: 6.5.2
 * Requires PHP:      8.2
 */

namespace Kotisivu\Gutenberg_Native_AI;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Current plugin and API versions.
 */
define( 'GUTENBERG_NATIVE_AI_VERSION', '0.1.2' );
define( 'GUTENBERG_NATIVE_AI_API_VERSION', '1' );

/**
 * Require the autoload.php file.
 */
require plugin_dir_path( __FILE__ ) . 'bootstrap.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-gutenberg-native-ai-activator.php
 */
function activate_gutenberg_native_ai() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-activator.php';
	Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-gutenberg-native-ai-deactivator.php
 */
function deactivate_gutenberg_native_ai() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-deactivator.php';
	Deactivator::deactivate();
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\activate_gutenberg_native_ai' );
register_deactivation_hook( __FILE__, __NAMESPACE__ . '\deactivate_gutenberg_native_ai' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-plugin.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_gutenberg_native_ai() {
	$plugin = new Plugin();
	$plugin->run();
}

run_gutenberg_native_ai();
