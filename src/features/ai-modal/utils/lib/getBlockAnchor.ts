/**
 * Get the block anchor element by client id
 * @param {string | undefined} clientId Block client id
 * @return {Promise<Element | null>} Block anchor element
 */
async function getBlockAnchor(
	clientId: string | undefined
): Promise<Element | null> {
	/**
	 * If block.json version is set to 3, editor is loaded inside a iframe
	 * and we need to get the block element from the iframe.
	 * Regular DOM manipulation doesn't work in this case.
	 *
	 * TODO: Handle the case where editorCanvas.contentWindow is null
	 */
	const editorCanvas = document.querySelector(
		'iframe[name="editor-canvas"]'
	) as HTMLIFrameElement;

	const blockElement =
		editorCanvas.contentWindow !== null
			? editorCanvas.contentWindow.document.getElementById(
					'block-' + clientId
				)
			: null;

	if (!blockElement) {
		return null;
	}

	return blockElement;
}

export { getBlockAnchor };
