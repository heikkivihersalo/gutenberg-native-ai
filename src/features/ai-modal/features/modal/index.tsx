/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { MODAL_STATUS } from '@constants/modal';
import { DATA_STORE } from '@constants/stores';

import ModalControlsText from './components/modal-text/ModalControlsText';
import ModalControlsImage from './components/modal-image/ModalControlsImage';

import type { ModalStatus } from 'types/modal';

/**
 * Textarea component
 * @param {Object} props - Component props
 * @param {Element} props.anchor - Popover anchor
 * @param {string} props.mode - Popover mode
 * @return {JSX.Element} Textarea component
 */
const Modal = ({
	anchor,
	mode,
}: {
	anchor: Element | null | undefined;
	mode: string;
}): JSX.Element | null => {
	const { status } = useSelect((select: WPAny) => {
		return {
			status: select(DATA_STORE).getStatus() as ModalStatus,
		};
	}, []);

	const modalOpen =
		status === MODAL_STATUS.VISIBLE || status === MODAL_STATUS.LOADING;

	if (!modalOpen) {
		return null;
	}

	return (
		<Popover placement="bottom" anchor={anchor}>
			{mode === 'text' && <ModalControlsText />}
			{mode === 'image' && <ModalControlsImage />}
		</Popover>
	);
};

export default Modal;
