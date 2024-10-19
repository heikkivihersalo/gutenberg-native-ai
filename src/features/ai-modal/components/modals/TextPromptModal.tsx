import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useChatGPT } from '@hooks';
import Form from '../form/Form';
import PromptControl from '../form/PromptControl';
import WarningText from '../form/WarningText';

import {
	addBlocksToEditor,
	parseMarkdownToBlocks,
	replateSelectedText,
} from '../../utils';

import { MODAL_STATUS } from '@constants/modal';

import type { ModalStatus, ModalSelection } from 'types/modal';

/**
 * TextPromptModal component
 * @return {JSX.Element} Popover component
 */
const TextPromptModal = (): JSX.Element | null => {
	const { status, selection } = useSelect((select: any) => {
		return {
			status: select('theme/ai').getStatus() as ModalStatus,
			selection: select('theme/ai').getSelection() as ModalSelection,
		};
	}, []);

	const { setStatus, setSelection } = useDispatch('theme/ai');
	const { getText } = useChatGPT();

	const modalOpen =
		status === MODAL_STATUS.VISIBLE || status === MODAL_STATUS.LOADING;

	if (!selection || !modalOpen) {
		return null;
	}

	/**
	 * Handle generate content
	 * @param event - Form event
	 */
	const generateContent = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus(MODAL_STATUS.LOADING);

		/**
		 * Get forn data
		 */
		const formData = new FormData(event.currentTarget);

		/**
		 * Handle prompt validation
		 * TODO: window.alert is not recommended, use a proper validation method
		 */
		if (!formData.get('prompt')) {
			// eslint-disable-next-line no-alert
			window.alert(__('Please enter a prompt', 'gutenberg-native-ai'));
			setStatus(MODAL_STATUS.INITIAL);
			return;
		}

		/**
		 * Fetch the block content
		 */
		const aiContent = await getText({
			prompt: formData.get('prompt'),
			selection: selection.text,
		});

		/**
		 * Check if user has highlighted text and replace it
		 * - If `selection.end` equals `selection.start` then it means no text is selected
		 * - If text is selected then replace it with AI generated content (e.g translation)
		 */
		if (selection.start !== selection.end) {
			replateSelectedText({
				block: selection.block,
				text: aiContent,
				start: selection.start,
				end: selection.end,
			});
		} else {
			const blocks = await parseMarkdownToBlocks(aiContent);
			if (selection.block) {
				addBlocksToEditor({
					currentBlock: selection.block,
					blocks,
				});
			}
		}

		setStatus(MODAL_STATUS.INITIAL);
		setSelection({
			block: null,
			text: '',
			start: 0,
			end: 0,
		});
	};

	return (
		<Form onSubmit={generateContent}>
			<PromptControl
				status={status}
				placeholder={__(
					'What do you want to write about?',
					'gutenberg-native-ai'
				)}
			/>
			<WarningText />
		</Form>
	);
};

export default TextPromptModal;
