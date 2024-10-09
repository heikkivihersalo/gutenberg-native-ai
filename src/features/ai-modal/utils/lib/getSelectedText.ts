/**
 * WordPress dependencies
 */
declare const wp: any;
const { getSelectionStart, getSelectionEnd } =
	wp.data.select('core/block-editor');

/**
 * Internal dependencies
 */
import type { ModalSelection } from 'types/modal';

/**
 * Get block text selection
 * @param {string} text Block text
 * @return {ModalSelection} Block text selection
 */
function getSelectedText(text: string): ModalSelection {
	const { offset: startOffset } = getSelectionStart();
	const { offset: endOffset } = getSelectionEnd();

	return {
		text: text.substring(startOffset, endOffset),
		start: startOffset,
		end: endOffset,
	};
}

export { getSelectedText };
