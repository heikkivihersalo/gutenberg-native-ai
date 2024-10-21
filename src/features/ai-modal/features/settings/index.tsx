/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ModelNav from './components/ModelNav';
import SettingsNav from './components/SettingsNav';
import QuickCommandsNav from './components/QuickCommandsNav';

import styles from './index.module.css';

/**
 * Settings component
 * @return {JSX.Element} Popover component
 */
const Settings = (): JSX.Element | null => {
	const [isVisible, setIsVisible] = useState(false);
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);

	return (
		<>
			<button
				type="button"
				ref={setAnchor}
				className={styles.settingsButton}
				aria-label={__('Prompt Modal Settings', 'gutenberg-native-ai')}
				onClick={() => {
					setIsVisible(!isVisible);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"></path>
				</svg>
			</button>
			{isVisible ? (
				<Popover placement="bottom-end" anchor={anchor}>
					<div className={styles.settingsContainer}>
						<ModelNav />
						<QuickCommandsNav />
						<SettingsNav />
					</div>
				</Popover>
			) : null}
		</>
	);
};

export default Settings;
