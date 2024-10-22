/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import { useAdminForm } from '@hooks';
import { OptionBody, OptionGroup } from './components/containers';
import { Form, FormHead, FormBody, FormButton } from './components/form';
import { Input, Select } from './components/inputs';

import {
	TONE_OF_VOICE,
	OPEN_AI_TEXT_MODEL,
	OPEN_AI_IMAGE_MODEL,
} from '@constants/options';

import type { ChatGPTFormData } from 'types/admin';

import './style.css';

/**
 * Main component
 * @return {JSX.Element} Main component
 */
const Main = (): JSX.Element | null => {
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
		<>
			<header>
				<h1>
					{__('Gutenberg Native AI Settings', 'gutenberg-native-ai')}
				</h1>
			</header>
			<OptionBody
				name={__('ChatGPT', 'gutenberg-native-ai')}
				description={sprintf(
					/* translators: %s: ChatGPT dashboard URL */
					__(
						'Configure the ChatGPT API settings. You can get the API key from the ChatGPT dashboard. Access the dashboard <a href="%s">here</a>.',
						'gutenberg-native-ai'
					),
					'https://platform.openai.com/api-keys'
				)}
			>
				<OptionGroup>
					<Form onSave={() => handleSave({ data: formData })}>
						<FormHead
							name={__('API Settings', 'gutenberg-native-ai')}
						/>
						<FormBody>
							<Select
								label={__(
									'Model (Text)',
									'gutenberg-native-ai'
								)}
								name="model_text"
								value={(formData as ChatGPTFormData).model_text}
								options={OPEN_AI_TEXT_MODEL}
								onChange={
									handleChange as React.ChangeEventHandler<HTMLSelectElement>
								}
							/>
							<Select
								label={__(
									'Model (Image)',
									'gutenberg-native-ai'
								)}
								name="model_image"
								value={
									(formData as ChatGPTFormData).model_image
								}
								options={OPEN_AI_IMAGE_MODEL}
								onChange={
									handleChange as React.ChangeEventHandler<HTMLSelectElement>
								}
							/>
							<Input
								type="text"
								label={__('API Key', 'gutenberg-native-ai')}
								name="api_key"
								placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
								value={(formData as ChatGPTFormData).api_key}
								onChange={
									handleChange as React.ChangeEventHandler<HTMLInputElement>
								}
							/>
							<Select
								label={__(
									'Tone of Voice',
									'gutenberg-native-ai'
								)}
								name="tone_of_voice"
								value={
									(formData as ChatGPTFormData).tone_of_voice
								}
								options={TONE_OF_VOICE}
								onChange={
									handleChange as React.ChangeEventHandler<HTMLSelectElement>
								}
							/>
						</FormBody>
						<FormButton />
					</Form>
				</OptionGroup>
			</OptionBody>
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
