/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ModelNav from './components/ModelNav';
import SettingsNav from './components/SettingsNav';
import QuickCommandsNav from './components/QuickCommandsNav';

import style from './index.module.css';

/**
 * Settings component
 * @param {Object} props - Component props
 * @param {boolean} props.settingsVisible - Settings visibility
 * @param {HTMLElement} props.anchor - Anchor element
 * @return {JSX.Element} Popover component
 */
const Settings = ({
	settingsVisible,
	anchor,
}: {
	settingsVisible: boolean;
	anchor: HTMLElement | null;
}): JSX.Element | null => {
	if (!settingsVisible) {
		return null;
	}

	return (
		<Popover placement="bottom-end" anchor={anchor}>
			<div className={style.settingsContainer}>
				<ModelNav />
				<QuickCommandsNav />
				<SettingsNav />
			</div>
		</Popover>
	);
};

export default Settings;
