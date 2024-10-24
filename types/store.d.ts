/**
 * Internal dependencies
 */
import { ACTIONS } from '@constants/actions';
import { API_PATH } from '@constants/api';
import {
	ModalMode,
	ModalSelection,
	ModalStatus,
	ModalSettings,
	ModalLanguages,
} from './modal';

/**
 * Default Redux Store Generics
 */
type StoreAction<T, P> = {
	type: T;
	payload: P;
};

type StoreApiSuccess<D> = {
	type: string;
	message: string;
	status: string;
	data: D;
};

type StoreApiResponse<D> = StoreApiSuccess<D>;

/**
 * Action Specific types
 */
type ReduxAction = (typeof ACTIONS)[keyof typeof ACTIONS];

type SetStatusAction = StoreAction<typeof ACTIONS.SET_STATUS, ModalStatus>;

type SetSelectionAction = StoreAction<
	typeof ACTIONS.SET_SELECTION,
	ModalSelection
>;

type SetModeAction = StoreAction<typeof ACTIONS.SET_MODE, ModalMode>;

type GetSettingsAction = StoreAction<
	typeof ACTIONS.GET_SETTINGS,
	typeof API_PATH.GET_SETTINGS
>;

type SetSettingsAction = StoreAction<
	typeof ACTIONS.SET_SETTINGS,
	ModalSettings
>;

type SetLanguageAction = StoreAction<
	typeof ACTIONS.SET_TRANSLATION_LANGUAGES,
	ModalLanguages
>;

type SettingsApiResponse = StoreApiResponse<ModalSettings>;

/**
 * Store type
 */
type Store = {
	mode: ModalMode;
	status: ModalStatus;
	selection: ModalSelection;
	languages: ModalLanguages;
	settings: ModalSettings;
};

/**
 * Reducer actions
 */
type ReducerState =
	| ModalStatus
	| ModalSelection
	| ModalSettings
	| ModalMode
	| ModalLanguages;
type ReducerAction =
	| SetStatusAction
	| SetSelectionAction
	| SetSettingsAction
	| SetModeAction
	| SetLanguageAction;
