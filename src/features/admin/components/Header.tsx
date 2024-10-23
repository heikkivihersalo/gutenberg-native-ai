/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from '../index.module.css';

/**
 * Header
 * @return {JSX.Element} Form Button Component
 */
const Header = (): JSX.Element => {
	return (
		<header className={styles.header}>
			<h1 className={styles.headerHeading}>
				{__('Gutenberg Native AI Settings', 'gutenberg-native-ai')}
			</h1>
		</header>
	);
};

export default Header;
