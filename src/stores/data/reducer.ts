/**
 * Internal dependencies
 */
import { MODAL_STATUS, MODAL_MODE } from '@constants/modal';

import type {
	ModalMode,
	ModalStatus,
	ModalSelection,
	ModalSettings,
} from 'types/modal';

import type {
	SetStatusAction,
	SetSelectionAction,
	SetSettingsAction,
	ReducerState,
} from 'types/store';

/**
 * Initial state
 */
const initialStatus: ModalStatus = MODAL_STATUS.INITIAL as ModalStatus;

const initialSelection: ModalSelection = {
	block: null,
	text: '',
	start: 0,
	end: 0,
};

const initialSettings: ModalSettings = {
	tone_of_voice: 'none',
	has_api_key: false,
	model: {
		image: 'dall-e-3',
		text: 'gpt-4o-mini',
	},
};

const initialMode: ModalMode = MODAL_MODE.TEXT as ModalMode;

/**
 * Status reducer
 * @param {ReducerState} state
 * @param {SetStatusAction} action
 * @return {ReducerState} New state
 */
export function status(
	state: ModalStatus = initialStatus,
	action: SetStatusAction
): ReducerState {
	if (action.type !== 'SET_STATUS') {
		return state;
	}

	return action.payload;
}

/**
 * Selection reducer
 * @param {ReducerState} state
 * @param {SetSelectionAction} action
 * @return {ReducerState} New state
 */
export function selection(
	state: ModalSelection = initialSelection,
	action: SetSelectionAction
): ReducerState {
	if (action.type !== 'SET_SELECTION') {
		return state;
	}

	return {
		...state,
		...action.payload,
	};
}

/**
 * Mode reducer
 * @param {ReducerState} state
 * @param {SetModeAction} action
 * @return {ReducerState} New state
 */
export function mode(
	state: ModalMode = initialMode,
	action: SetStatusAction
): ReducerState {
	if (action.type !== 'SET_MODE') {
		return state;
	}

	return action.payload;
}

/**
 * Settings reducer
 * @param {ReducerState} state
 * @param {SetSettingsAction} action
 * @return {ReducerState} New state
 */
export function settings(
	state: ModalSettings = initialSettings,
	action: SetSettingsAction
): ReducerState {
	if (action.type !== 'SET_SETTINGS') {
		return state;
	}

	return {
		...state,
		...action.payload,
	};
}
