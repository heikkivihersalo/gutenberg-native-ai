/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useChatGPT } from '@hooks';

import Form from '../form/Form';
import FormInput from '../form/FormInput';
import FormSubmitButton from '../form/FormSubmitButton';
import CloseButton from '../CloseButton';
import WarningText from '../WarningText';
import Settings from '../../../settings';

import {
	addBlocksToEditor,
	parseMarkdownToBlocks,
	replateSelectedText,
} from '../../../../utils';

import { MODAL_STATUS } from '@constants/modal';
import { DATA_STORE } from '@constants/stores';

import type { ModalStatus, ModalSelection, ModalSettings } from 'types/modal';

import styles from '../../index.module.css';

/**
 * TextPromptModal component
 * @return {JSX.Element} Popover component
 */
const ModalControlsText = (): JSX.Element | null => {
	const { status, selection, settings } = useSelect((select: WPAny) => {
		return {
			status: select(DATA_STORE).getStatus() as ModalStatus,
			selection: select(DATA_STORE).getSelection() as ModalSelection,
			settings: select(DATA_STORE).getSettings() as ModalSettings,
		};
	}, []);

	const { setStatus, setSelection } = useDispatch(DATA_STORE);
	const { getText } = useChatGPT();

	const handleCLose = () => {
		setStatus(MODAL_STATUS.INITIAL);
		setSelection({
			block: null,
			text: '',
			start: 0,
			end: 0,
		});
	};

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

		handleCLose();
	};

	return (
		<Form onSubmit={generateContent} hasApiKey={settings.has_api_key}>
			<div className={styles.controlContainer}>
				<FormInput
					placeholder={__(
						'What do you want to write about?',
						'gutenberg-native-ai'
					)}
				/>
				<FormSubmitButton status={status} />
				<CloseButton closeCallback={handleCLose} />
				<Settings />
			</div>
			<WarningText />
		</Form>
	);
};

export default ModalControlsText;
