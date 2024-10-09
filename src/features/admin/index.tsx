/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import ChatGPT from './pages/ChatGPT';
import './style.css';

/**
 * Main component
 * @return {JSX.Element} Main component
 */
const Main = (): JSX.Element => {
	return (
		<>
			<header>
				<h1>
					{__('Gutenberg Native AI Settings', 'gutenberg-native-ai')}
				</h1>
			</header>
			<ChatGPT />
		</>
	);
};

/**
 * Render app
 */
domReady(() => {
	const container = document.getElementById('gutenberg-native-ai-settings');
	if (container) {
		createRoot(container).render(<Main />);
	}
});
