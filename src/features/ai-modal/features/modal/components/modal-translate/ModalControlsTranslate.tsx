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
import FormSubmitButton from '../form/FormSubmitButton';
import LanguageSelector from './LanguageSelector';
import CloseButton from '../CloseButton';
import WarningText from '../WarningText';
import Settings from '../../../settings';

import { closeModal, replateSelectedText } from '../../../../utils';

import { MODAL_STATUS } from '@constants/modal';
import { DATA_STORE } from '@constants/stores';

import type {
	ModalStatus,
	ModalSelection,
	ModalSettings,
	ModalLanguages,
} from 'types/modal';

import styles from '../../index.module.css';

/**
 * TextPromptModal component
 * @return {JSX.Element} Popover component
 */
const ModalControlsTranslate = (): JSX.Element | null => {
	const { status, selection, settings, languages } = useSelect(
		(select: WPAny) => {
			return {
				status: select(DATA_STORE).getStatus() as ModalStatus,
				selection: select(DATA_STORE).getSelection() as ModalSelection,
				settings: select(DATA_STORE).getSettings() as ModalSettings,
				languages: select(DATA_STORE).getLanguages() as ModalLanguages,
			};
		},
		[]
	);

	const { setStatus } = useDispatch(DATA_STORE);
	const { translate } = useChatGPT();

	/**
	 * Handle generate content
	 * @param event - Form event
	 */
	const translateSelectedContent = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		setStatus(MODAL_STATUS.LOADING);

		/**
		 * Handle prompt validation
		 * TODO: window.alert is not recommended, use a proper validation method
		 */
		if (selection.start === selection.end) {
			// eslint-disable-next-line no-alert
			window.alert(
				__('Please select text to translate', 'gutenberg-native-ai')
			);
			closeModal();
			return;
		}

		/**
		 * Fetch the block content
		 */
		const aiContent = await translate({
			selection: selection.text,
			languageFrom: languages.from,
			languageTo: languages.to,
		});

		replateSelectedText({
			block: selection.block,
			text: aiContent,
			start: selection.start,
			end: selection.end,
		});

		closeModal();
	};

	return (
		<Form
			onSubmit={translateSelectedContent}
			hasApiKey={settings.has_api_key}
		>
			<div className={styles.controlContainer}>
				<LanguageSelector />
				<FormSubmitButton status={status} />
				<CloseButton closeCallback={closeModal} />
				<Settings />
			</div>
			<WarningText />
		</Form>
	);
};

export default ModalControlsTranslate;
