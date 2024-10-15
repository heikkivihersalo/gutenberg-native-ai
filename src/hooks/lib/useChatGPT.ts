/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { API_PATH } from '@constants/api';
import type { ChatGPTPromptInput } from '@hooks';

/**
 *
 */
function useChatGPT() {
	/**
	 * Get text content from ChatGPT
	 * @param {UserInput} props
	 * @param {FormDataEntryValue | null} props.prompt
	 * @return {Promise<string>}
	 */
	const getText = async ({
		prompt,
		selection,
	}: ChatGPTPromptInput): Promise<string> => {
		const response: ChatGPTTextResponse = await apiFetch({
			method: 'POST',
			path: API_PATH.GENERATE_TEXT,
			data: {
				prompt: selection !== '' ? `${prompt}: ${selection}` : prompt,
			},
		});

		return response.choices[0].message.content;
	};

	/**
	 *
	 * @param {UserInput} props
	 * @param {FormDataEntryValue | null} props.prompt
	 * @return {Promise<ChatGPTImage[]>}
	 */
	const getImage = async ({
		prompt,
	}: ChatGPTPromptInput): Promise<ChatGPTImage[]> => {
		const response: ChatGPTImageResponse = await apiFetch({
			method: 'POST',
			path: API_PATH.GENERATE_IMAGE,
			data: {
				prompt,
			},
		});

		return response.data;
	};

	return { getText, getImage };
}

export { useChatGPT };
