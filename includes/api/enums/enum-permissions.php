<?php
/**
 * The API permissions enum file
 *
 * @link       https://www.kotisivu.dev
 * @since      0.1.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\Gutenberg_Native_AI\Api;

/**
 * Enum Permission
 *
 * @since      0.1.0
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
enum Permissions {
	/**
	 * Admin permission
	 *
	 * @since 0.1.0
	 */
	case ADMIN;

	/**
	 * Get the callback for the permission
	 *
	 * @since    0.1.0
	 * @access   public
	 * @return   \Closure|bool
	 */
	public function get_callback(): \Closure|bool {
		return match ( $this ) {
			self::ADMIN => function () {
				$user = wp_get_current_user();

				if ( 0 === $user->ID ) {
					$php_auth_user = isset( $_SERVER['PHP_AUTH_USER'] ) ? sanitize_text_field( wp_unslash( $_SERVER['PHP_AUTH_USER'] ) ) : '';
					$php_auth_pw   = isset( $_SERVER['PHP_AUTH_PW'] ) ? sanitize_text_field( wp_unslash( $_SERVER['PHP_AUTH_PW'] ) ) : '';
					$user          = wp_authenticate_application_password(
						get_user_by( 'login', $php_auth_user ),
						$php_auth_user,
						$php_auth_pw
					);

					if ( is_wp_error( $user ) ) {
						return false;
					}
				}

				if ( in_array( 'administrator', (array) $user->roles, true ) ) {
					return true;
				}
			},
		};
	}
}
