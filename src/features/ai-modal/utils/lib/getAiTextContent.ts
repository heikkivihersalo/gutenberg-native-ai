/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { API_PATH } from '@constants/api';

type Props = {
	prompt: FormDataEntryValue | null;
	selection: string;
};

/**
 * Get blocks from the AI
 * @param {string} prompt Prompt
 * @return {Promise<BlockInstance[]>} Array of block instances
 */
async function getAiTextContent({ prompt, selection }: Props): Promise<string> {
	const response: ChatGPTTextResponse = await apiFetch({
		method: 'POST',
		path: API_PATH.GENERATE_TEXT,
		data: {
			prompt: selection !== '' ? `${prompt}: ${selection}` : prompt,
		},
	});

	return response.choices[0].message.content;
}

export { getAiTextContent };
