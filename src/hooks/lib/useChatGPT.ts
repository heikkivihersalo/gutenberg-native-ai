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
		const response: unknown = await apiFetch({
			method: 'POST',
			path: API_PATH.GENERATE_TEXT,
			data: {
				prompt: selection !== '' ? `${prompt}: ${selection}` : prompt,
				tone_of_voice: settings.tone_of_voice,
			},
		});

		// TODO: Find a better way to handle this
		if ((response as ChatGPTError).error) {
			console.error((response as ChatGPTError).error.message);
		}

		return (response as ChatGPTTextResponse).choices[0].message.content;
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
		const response: unknown = await apiFetch({
			method: 'POST',
			path: API_PATH.GENERATE_IMAGE,
			data: {
				prompt,
			},
		});

		// TODO: Find a better way to handle this
		if ((response as ChatGPTError).error) {
			console.error((response as ChatGPTError).error.message);
		}

		return (response as ChatGPTImageResponse).data;
	};

	return { getText, getImage };
}

export { useChatGPT };
