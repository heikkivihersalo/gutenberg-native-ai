/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Header
 * @return {JSX.Element} Form Button Component
 */
const Header = (): JSX.Element => {
	return (
		<header>
			<h1>{__('Gutenberg Native AI Settings', 'gutenberg-native-ai')}</h1>
		</header>
	);
};

export { Header };
