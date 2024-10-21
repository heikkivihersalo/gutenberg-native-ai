/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { API_PATH } from '@constants/api';
import { useSelect } from '@wordpress/data';

import type { ModalSettings } from 'types/modal';
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
	const { settings } = useSelect((select: WPAny) => {
		return {
			settings: select('theme/ai').getSettings() as ModalSettings,
		};
	}, []);

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
				tone_of_voice: settings.tone_of_voice,
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
