/**
 * Internal dependencies
 */
import type { ModalSelection, ModalStatus, ModalSettings } from 'types/modal';
import type { Store } from 'types/store';

/**
 * Selectors for the store
 */
const selectors = {
	/**
	 * Get store state
	 * @param {Store} state Store state
	 */
	getStatus(state: Store): ModalStatus {
		return state.status;
	},
	/**
	 * Get current selection from store state
	 * @param {Store} state Store state
	 */
	getSelection(state: Store): ModalSelection {
		return state.selection;
	},
	/**
	 * Get current settings from store state
	 * @param {Store} state Store state
	 */
	getSettings(state: Store): ModalSettings {
		return state.settings;
	},
};

export default selectors;
