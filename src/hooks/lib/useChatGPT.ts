/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { API_PATH } from '@constants/api';
import type { ChatGPTPromptInput } from '@hooks';

type ReturnProps = {
	getText: (props: ChatGPTPromptInput) => Promise<string>;
	getImage: (props: ChatGPTPromptInput) => Promise<ChatGPTImage[]>;
};

/**
 * Custom hook for ChatGPT API
 * @return {ReturnProps} ChatGPT API functions
 */
function useChatGPT(): ReturnProps {
	/**
	 * Get text content from ChatGPT
	 * @param {UserInput} props
	 * @param {FormDataEntryValue | null} props.prompt
	 * @return {Promise<string>} Generated text
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
	 * @return {Promise<ChatGPTImage[]>} Generated image
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
