/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useAdminForm } from '@hooks';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

import {
	TONE_OF_VOICE,
	OPEN_AI_TEXT_MODEL,
	OPEN_AI_IMAGE_MODEL,
} from '@constants/options';

import type { ChatGPTFormData } from 'types/admin';

import styles from '../../index.module.css';

/**
 * Header
 * @return {JSX.Element} Form Button Component
 */
const Form = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'gutenberg-native-ai/v1/settings',
		nonce: window.GUTENBERG_NATIVE_AI?.nonce,
	});

	/**
	 * Return early if form is not set and loaded
	 */
	if (!formData) {
		return null;
	}

	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				handleSave(formData);
			}}
		>
			<h3 className={styles.formHeading}>
				{__('API Settings', 'gutenberg-native-ai')}
			</h3>
			<div className={styles.formInputContainer}>
				<FormSelect
					label={__('Model (Text)', 'gutenberg-native-ai')}
					name="model_text"
					value={(formData as ChatGPTFormData).model_text}
					options={OPEN_AI_TEXT_MODEL}
					onChange={
						handleChange as React.ChangeEventHandler<HTMLSelectElement>
					}
				/>
				<FormSelect
					label={__('Model (Image)', 'gutenberg-native-ai')}
					name="model_image"
					value={(formData as ChatGPTFormData).model_image}
					options={OPEN_AI_IMAGE_MODEL}
					onChange={
						handleChange as React.ChangeEventHandler<HTMLSelectElement>
					}
				/>
				<FormInput
					type="text"
					label={__('API Key', 'gutenberg-native-ai')}
					name="api_key"
					placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
					value={(formData as ChatGPTFormData).api_key}
					onChange={
						handleChange as React.ChangeEventHandler<HTMLInputElement>
					}
				/>
				<FormSelect
					label={__('Tone of Voice', 'gutenberg-native-ai')}
					name="tone_of_voice"
					value={(formData as ChatGPTFormData).tone_of_voice}
					options={TONE_OF_VOICE}
					onChange={
						handleChange as React.ChangeEventHandler<HTMLSelectElement>
					}
				/>
			</div>
			<button type="submit" className={styles.formButton}>
				{__('Save Changes', 'gutenberg-native-ai')}
			</button>
		</form>
	);
};

export default Form;
