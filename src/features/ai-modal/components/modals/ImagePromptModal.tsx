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
import PromptControl from '../form/PromptControl';
import WarningText from '../form/WarningText';
import ImagePreview from '../image-preview/ImagePreview';

import { MODAL_STATUS } from '@constants/modal';

import type { ModalStatus } from 'types/modal';

/**
 * ImagePromptModal component
 * @return {JSX.Element} Popover component
 */
const ImagePromptModal = (): JSX.Element | null => {
	const [preview, setPreview] = useState<ChatGPTImage[] | null>(null);
	const { status } = useSelect((select: any) => {
		return {
			status: select('theme/ai').getStatus() as ModalStatus,
		};
	}, []);

	const { setStatus } = useDispatch('theme/ai');
	const { getImage } = useChatGPT();

	const modalOpen =
		status === MODAL_STATUS.VISIBLE || status === MODAL_STATUS.LOADING;

	if (!modalOpen) {
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
		const images = await getImage({
			prompt: formData.get('prompt'),
		});

		setPreview(images);
	};

	return (
		<Form onSubmit={generateContent}>
			<PromptControl
				status={status}
				placeholder={__(
					'What kind of image you want to generate?',
					'gutenberg-native-ai'
				)}
			/>
			<ImagePreview preview={preview} />
			<WarningText />
		</Form>
	);
};

export default ImagePromptModal;
