/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import SettingsNavItem from './SettingsNavItem';

import { DATA_STORE } from '@constants/stores';
import { TONE_OF_VOICE } from '@constants/options';

import type { ModalSettings } from 'types/modal';

import style from '../index.module.css';

/**
 * General settings navigation component
 * @return {JSX.Element} General settings navigation component
 */
const SettingsNav = (): JSX.Element => {
	const { settings } = useSelect((select: WPAny) => {
		return {
			settings: select(DATA_STORE).getSettings() as ModalSettings,
		};
	}, []);

	const { setSettings } = useDispatch(DATA_STORE);

	return (
		<div className={style.navContainer}>
			<div className={style.navLabel}>
				{__('Settings', 'gutenberg-native-ai')}
			</div>
			<ul className={style.navList}>
				<SettingsNavItem
					label={__('Change Tone', 'gutenberg-native-ai')}
					icon={
						<svg
							width="17"
							height="13"
							viewBox="0 0 17 13"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.34266 7.84824C2.60298 7.38359 2.52329 6.8123 2.14345 6.43145C1.57766 5.8627 1.27485 5.17969 1.27485 4.46875C1.27485 2.85645 2.96954 1.21875 5.52485 1.21875C8.08016 1.21875 9.77485 2.85645 9.77485 4.46875C9.77485 6.08105 8.08016 7.71875 5.52485 7.71875C5.17688 7.71875 4.83954 7.68574 4.52079 7.62734C4.24454 7.57656 3.95766 7.61211 3.70532 7.73398C3.59641 7.7873 3.48485 7.83809 3.37063 7.88633C2.94563 8.06914 2.49673 8.2291 2.04516 8.34336C2.11954 8.22656 2.1886 8.1123 2.25501 7.99805C2.28423 7.9498 2.31345 7.89902 2.34001 7.84824H2.34266ZM5.52485 8.9375C8.57688 8.9375 11.0499 6.93672 11.0499 4.46875C11.0499 2.00078 8.57688 0 5.52485 0C2.47282 0 -0.000148366 2.00078 -0.000148366 4.46875C-0.000148366 5.53008 0.456727 6.50254 1.21907 7.26934C1.19516 7.3125 1.1686 7.3582 1.1447 7.39883C0.871102 7.86602 0.552352 8.32559 0.172508 8.72168C-0.00280462 8.89941 -0.0479609 9.1584 0.0503204 9.3793C0.153914 9.60527 0.382352 9.75 0.637352 9.75C1.77954 9.75 2.93501 9.4123 3.89657 8.9959C4.02407 8.94004 4.15157 8.88164 4.27376 8.82324C4.67485 8.89941 5.09454 8.9375 5.52485 8.9375ZM11.4749 12.1875C11.9052 12.1875 12.3222 12.1469 12.7259 12.0732C12.8481 12.1316 12.9756 12.19 13.1031 12.2459C14.0647 12.6623 15.2202 13 16.3624 13C16.6174 13 16.8458 12.8553 16.9467 12.6318C17.0477 12.4084 16.9999 12.1494 16.8245 11.9742C16.4474 11.5781 16.1286 11.1186 15.8524 10.6514C15.8284 10.6082 15.8019 10.565 15.778 10.5219C16.543 9.75254 16.9999 8.78008 16.9999 7.71875C16.9999 5.32188 14.665 3.36426 11.7352 3.25508C11.8441 3.64102 11.8999 4.04727 11.8999 4.46875V4.48398C14.2161 4.6541 15.7249 6.19785 15.7249 7.71875C15.7249 8.42969 15.422 9.1127 14.8563 9.67891C14.4764 10.0598 14.3967 10.6336 14.657 11.0957C14.6863 11.1465 14.7155 11.1973 14.742 11.2455C14.8084 11.3598 14.8802 11.474 14.9519 11.5908C14.5003 11.4766 14.0514 11.3191 13.6264 11.1338C13.5122 11.0855 13.4006 11.0348 13.2917 10.9814C13.0394 10.8596 12.7525 10.824 12.4763 10.8748C12.1549 10.9357 11.8175 10.9662 11.4722 10.9662C9.83329 10.9662 8.55032 10.2934 7.83845 9.38438C7.41345 9.52148 6.9672 9.62305 6.51032 9.68398C7.41079 11.1668 9.29673 12.1875 11.4749 12.1875Z"
								fill="#1E1E1E"
							/>
						</svg>
					}
					subMenuValue={settings.tone_of_voice}
					subMenuLabel={__('Tone of Voice', 'gutenberg-native-ai')}
					subMenuOptions={TONE_OF_VOICE}
					subMenuCallback={(value) => {
						setSettings({ ...settings, tone_of_voice: value });
					}}
				/>
			</ul>
		</div>
	);
};

export default SettingsNav;
