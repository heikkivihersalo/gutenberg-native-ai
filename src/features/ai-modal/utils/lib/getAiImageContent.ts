/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { API_PATH } from '@constants/api';

/**
 * Get blocks from the AI
 * @param {string} prompt Prompt
 * @return {Promise<Image[]>} Array of block instances
 */
async function getAiImageContent({
	prompt,
}: {
	prompt: FormDataEntryValue | null;
}): Promise<ChatGPTImage[]> {
	const response: ChatGPTImageResponse = await apiFetch({
		method: 'POST',
		path: API_PATH.GENERATE_IMAGE,
		data: {
			prompt,
		},
	});

	return response.data;
}

export { getAiImageContent };
