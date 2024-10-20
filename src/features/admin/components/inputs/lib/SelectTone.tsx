/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TONE_OF_VOICE } from '@constants/options';
import styles from './SelectTone.module.css';

/**
 * Select Component
 * @return {JSX.Element} Toggle component
 */
const SelectTone = (): JSX.Element => {
	return (
		<div className={styles.select}>
			<label htmlFor="ai-tone">
				{__('Default Tone of Voice', 'gutenberg-native-ai')}
			</label>
			<select name="ai-tone" id="ai-tone-select">
				{TONE_OF_VOICE.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export { SelectTone };
