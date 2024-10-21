/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { ShortcutProvider, useShortcut } from '@wordpress/keyboard-shortcuts';
import { useState, useCallback } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { MODAL_STATUS, ALLOWED_TEXT_BLOCKS } from '@constants/modal';

import Modal from './modal';

import {
	getCurrentSelection,
	getBlockAnchor,
	highlightTextSelection,
} from '../utils';

import type { ModalMode } from 'types/modal';

/**
 * Higher order component to add AI controls to the paragraph block
 * @param {React.ComponentType<BlockEditProps>} BlockEdit - The block edit component
 * @return {JSX.Element}
 */
const BlockEditControl = createHigherOrderComponent(function (
	BlockEdit: React.ComponentType<BlockEditProps>
) {
	return (props: BlockEditProps) => {
		/**
		 * Handle anchor state
		 * - This is used to position the popover window at correct position
		 * - Must be used as a local state but it doesn't matter because we only need it here
		 */
		const [anchor, setAnchor] = useState<Element | null | undefined>(null);

		/**
		 * Handle state from the redux store
		 */
		const { mode } = useSelect((select: WPAny) => {
			return {
				mode: select('theme/ai').getMode() as ModalMode,
			};
		}, []);

		const { setStatus, setSelection } = useDispatch('theme/ai');

		/**
		 * Handle keyboard shortcut to open the popover
		 */
		useShortcut(
			'gutenberg-native-ai/shortcut-ai-open',
			useCallback(async () => {
				const currentSelection = await getCurrentSelection();

				if (currentSelection) {
					await setSelection(currentSelection);
					await setStatus(MODAL_STATUS.VISIBLE);

					const blockAnchor = await getBlockAnchor(
						currentSelection.block?.clientId
					);

					setAnchor(blockAnchor);
					highlightTextSelection(blockAnchor, currentSelection.text);
				}
			}, [setSelection, setStatus])
		);

		/**
		 * Only allow AI controls for selected blocks
		 */
		if (!ALLOWED_TEXT_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		if (!props.isSelected) {
			return <BlockEdit {...props} />;
		}

		/**
		 * Handle the modal
		 */
		return (
			<ShortcutProvider>
				<BlockEdit {...props} />
				<Modal anchor={anchor} mode={mode} />
			</ShortcutProvider>
		);
	};
}, 'BlockEditControl');

export default BlockEditControl;
