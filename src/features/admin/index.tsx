/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createRoot } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import Header from './components/Header';
import Form from './components/form/Form';
import FormContainer from './components/form/FormContainer';

import './style.css';

/**
 * Main component
 * @return {JSX.Element} Main component
 */
const Main = (): JSX.Element | null => {
	return (
		<>
			<Header />
			<FormContainer>
				<Form />
			</FormContainer>
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
