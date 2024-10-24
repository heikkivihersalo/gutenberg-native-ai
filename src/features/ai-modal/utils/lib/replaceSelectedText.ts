/**
 * WordPress dependencies
 */
declare const wp: WPAny;
const { create, insert, toHTMLString } = wp.richText;
const { updateBlock } = wp.data.dispatch('core/block-editor');

/**
 *
 */
import type { ModalSelection } from 'types/modal';

/**
 * Replace selected content from rich text element
 * @param {ModalSelection} props
 * @param {BlockInstance|null} props.block Selected block
 * @param {string} props.text New content
 * @param {number} props.start Start index
 * @param {number} props.end End index
 * @return {void} void
 */
function replateSelectedText({
	block,
	text,
	start,
	end,
}: ModalSelection): void {
	if (!block) {
		return;
	}

	const blockContent = insert(block.attributes.content, text, start, end);

	const richTextContent = create({
		text: blockContent.text,
	});

	const htmlContent = toHTMLString({
		value: richTextContent,
	});

	updateBlock(block.clientId, {
		attributes: {
			content: htmlContent,
		},
	});
}

export { replateSelectedText };
