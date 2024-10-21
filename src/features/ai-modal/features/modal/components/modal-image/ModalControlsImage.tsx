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

import type { ModalStatus, ModalSelection } from 'types/modal';

import styles from '../../index.module.css';

/**
 * ImagePromptModal component
 * @return {JSX.Element} Popover component
 */
const ModalImage = (): JSX.Element | null => {
	const [preview, setPreview] = useState<ChatGPTImage[] | null>(null);
	const { status } = useSelect((select: WPAny) => {
		return {
			status: select('theme/ai').getStatus() as ModalStatus,
			selection: select('theme/ai').getSelection() as ModalSelection,
		};
	}, []);

	const { setStatus, setSelection } = useDispatch('theme/ai');
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
		<Form onSubmit={generateContent}>
			<div className={styles.controlContainer}>
				<FormInput
					placeholder={__(
						'What kind of image you want to generate?',
						'gutenberg-native-ai'
					)}
				/>
				<FormSubmitButton status={status} />
				<CloseButton closeCallback={handleCLose} />
				<Settings />
			</div>
			<ImagePreview preview={preview} />
			<WarningText />
		</Form>
	);
};

export default ModalImage;
