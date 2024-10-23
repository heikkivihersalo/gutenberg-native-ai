/**
 * Internal dependencies
 */
import { ACTIONS } from '@constants/actions';
import {
	ModalMode,
	ModalStatus,
	ModalSelection,
	ModalSettings,
} from 'types/modal';
import {
	SetStatusAction,
	SetSelectionAction,
	SetModeAction,
	GetSettingsAction,
	SetSettingsAction,
} from 'types/store';

/**
 * Actions for the store.
 * Used to dispatch data to the store.
 */
const actions = {
	/**
	 * Set action for the store.
	 * @param {Status} status Options object.
	 * @return {SetStatusAction} Action object.
	 */
	setStatus(status: ModalStatus): SetStatusAction {
		return {
			type: ACTIONS.SET_STATUS,
			payload: status,
		};
	},
	/**
	 * Set action for the store.
	 * @param {Selection} selection
	 * @return {SetStatusAction} Action object.
	 */
	setSelection(selection: ModalSelection): SetSelectionAction {
		return {
			type: ACTIONS.SET_SELECTION,
			payload: selection,
		};
	},
	/**
	 * Set action for the store.
	 * @param {Mode} mode
	 * @return {SetModeAction} Action object.
	 */
	setMode(mode: ModalMode): SetModeAction {
		return {
			type: ACTIONS.SET_MODE,
			payload: mode,
		};
	},
	/**
	 * Get action for the settings.
	 * @param {string} path
	 * @return {GetSettingsAction} Action object.
	 */
	getSettings(path: string): GetSettingsAction {
		return {
			type: ACTIONS.GET_SETTINGS,
			payload: path,
		};
	},
	/**
	 * Set action for the store.
	 * @param {Settings} settings
	 * @return {SetSettingsAction} Action object.
	 */
	setSettings(settings: ModalSettings): SetSettingsAction {
		return {
			type: ACTIONS.SET_SETTINGS,
			payload: settings,
		};
	},
};

export default actions;
