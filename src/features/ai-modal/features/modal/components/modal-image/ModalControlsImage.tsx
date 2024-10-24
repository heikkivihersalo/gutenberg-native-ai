/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
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
import ImagePreview from './ImagePreview';

import { MODAL_STATUS } from '@constants/modal';
import { DATA_STORE } from '@constants/stores';

import type {
	ModalSettings,
	ModalStatus,
	ModalMode,
	ModalSelection,
} from 'types/modal';

import styles from '../../index.module.css';

/**
 * ImagePromptModal component
 * @return {JSX.Element} Popover component
 */
const ModalImage = (): JSX.Element | null => {
	const [preview, setPreview] = useState<ChatGPTImage[] | null>(null);
	const { status, settings, mode } = useSelect((select: WPAny) => {
		return {
			status: select(DATA_STORE).getStatus() as ModalStatus,
			settings: select(DATA_STORE).getSettings() as ModalSettings,
			selection: select(DATA_STORE).getSelection() as ModalSelection,
			mode: select(DATA_STORE).getMode() as ModalMode,
		};
	}, []);

	const { setStatus, setSelection } = useDispatch(DATA_STORE);
	const { getImage } = useChatGPT();

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
		const images = await getImage({
			prompt: formData.get('prompt'),
		});

		setPreview(images);
	};

	return (
		<Form onSubmit={generateContent} hasApiKey={settings.has_api_key}>
			<div className={styles.controlContainer}>
				<FormInput
					placeholder={__(
						'What kind of image you want to generate?',
						'gutenberg-native-ai'
					)}
				/>
				<div className={styles.controlContainerButtons}>
					<FormSubmitButton status={status} mode={mode} />
					<CloseButton closeCallback={handleCLose} />
					<Settings />
				</div>
			</div>
			<ImagePreview preview={preview} />
			<WarningText />
		</Form>
	);
};

export default ModalImage;
