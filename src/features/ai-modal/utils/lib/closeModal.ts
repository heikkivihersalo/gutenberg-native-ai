/**
 * WordPress dependencies
 */
declare const wp: WPAny;

/**
 * Internal dependencies
 */
import { DATA_STORE } from '@constants/stores';
import { MODAL_STATUS } from '@constants/modal';

/**
 * Close modal
 * @return {void}
 */
function closeModal(): void {
	const { setStatus, setSelection } = wp.data.dispatch(DATA_STORE);

	setStatus(MODAL_STATUS.INITIAL);
	setSelection({
		block: null,
		text: '',
		start: 0,
		end: 0,
	});
}

export { closeModal };
