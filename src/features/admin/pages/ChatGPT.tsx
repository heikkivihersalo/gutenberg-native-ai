/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useAdminForm } from '@hooks';
import { OptionBody, OptionGroup } from '../components/containers';
import { Form, FormHead, FormBody, FormButton } from '../components/form';
import { Input } from '../components/inputs';
import type { ChatGPTAdminRequestData } from '@api';

/**
 * Analytics Settings Page
 * @return {JSX.Element} JSX for the analytics settings page
 */
const ChatGPT = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'gutenberg-native-ai/v1/settings',
		nonce: window.gutenbergNativeAiSettings?.nonce,
	});

	/**
	 * Return early if form is not set and loaded
	 */
	if (!formData) {
		return null;
	}

	/**
	 * Render the component
	 */
	return (
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
						<Input
							type="text"
							label={__('Model', 'gutenberg-native-ai')}
							name="model"
							placeholder="gpt-4o-mini"
							value="gpt-4o-mini"
							disabled={true}
						/>
						<Input
							type="text"
							label={__('API Key', 'gutenberg-native-ai')}
							name="api_key"
							placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
							value={
								(formData as ChatGPTAdminRequestData).api_key
							}
							onChange={handleChange}
						/>
					</FormBody>
					<FormButton />
				</Form>
			</OptionGroup>
		</OptionBody>
	);
};

export default ChatGPT;
