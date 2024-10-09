/**
 * WordPress dependencies
 */
declare const wp: any;
const { getSelectedBlock } = wp.data.select('core/block-editor');

/**
 * Internal dependencies
 */
import { getSelectedText } from '../../utils';
import { ALLOWED_TEXT_BLOCKS } from '@constants/modal';

import type { ModalSelection } from 'types/modal';

/**
 * Handle text prompt shortcut
 * @return {Promise<void>}
 */
async function getCurrentSelection(): Promise<ModalSelection | null> {
	/**
	 * Check that we are in the correct block and set the selected block
	 */
	const currentBlock = await getSelectedBlock();

	const {
		name: blockName,
		attributes: {
			content: { text: blockTextContent },
		},
	} = currentBlock;

	if (!ALLOWED_TEXT_BLOCKS.includes(blockName)) {
		return null;
	}

	/**
	 * Get the selected text and elements
	 */
	const {
		text: selectedText,
		start: startIndex,
		end: endIndex,
	} = getSelectedText(blockTextContent);

	/**
	 * Return the selection
	 */
	return {
		block: currentBlock,
		text: selectedText,
		start: startIndex,
		end: endIndex,
	};
}

export { getCurrentSelection };
