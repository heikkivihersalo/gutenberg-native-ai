<?php
/**
 * The enqueue scripts interface.
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.3
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI;

/**
 * The enqueue scripts interface.
 *
 * @since      0.1.3
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
interface ScriptsInterface {
	/**
	 * The name of the localized object
	 *
	 * @since    0.1.3
	 * @access   protected
	 * @var      string    LOCALIZED_OBJECT_NAME    The name of the localized object
	 */
	public const LOCALIZED_OBJECT_NAME = 'GUTENBERG_NATIVE_AI';

	/**
	 * Check if the plugin's assets exist and display a notice if they don't
	 *
	 * @since    0.1.3
	 * @access   public
	 * @param    string $path The path to the asset
	 * @return   bool
	 */
	public function asset_exists( string $path, string $type = '' ): bool;

	/**
	 * Register the stylesheets for the plugin.
	 *
	 * @since    0.1.3
	 * @access   public
	 * @param    string $asset_path   The path to the asset
	 * @param    string $style_url    The URL to the stylesheet
	 * @param    string $handle       The handle for the stylesheet
	 * @return   void
	 */
	public function enqueue_style( string $asset_path, string $style_url, string $handle = '' ): void;

	/**
	 * Register the scripts for the plugin.
	 *
	 * @since    0.1.3
	 * @access   public
	 * @param    string $asset_path   The path to the asset
	 * @param    string $script_url   The URL to the script
	 * @param    string $handle       The handle for the script
	 * @return   void
	 */
	public function enqueue_script( string $asset_path, string $script_url, string $handle = '' ): void;

	/**
	 * Run the editor scripts and styles
	 *
	 * @since    0.1.3
	 * @access   public
	 * @param    string $hook The current admin page
	 * @return   void
	 */
	public function enqueue_scripts_and_styles( string $hook ): void;
}
