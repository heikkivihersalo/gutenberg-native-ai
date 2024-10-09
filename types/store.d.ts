/**
 * Internal dependencies
 */
import { ACTIONS } from '@constants/actions';
import { ModalSelection, ModalStatus, ModalSettings } from './modal';

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

type SetSettingsAction = StoreAction<
	typeof ACTIONS.SET_SETTINGS,
	ModalSettings
>;

/**
 * Store type
 */
type Store = {
	status: ModalStatus;
	selection: ModalSelection;
	settings: ModalSettings;
};

/**
 * Reducer actions
 */
type ReducerState = ModalStatus | ModalSelection | ModalSettings;
type ReducerAction = SetStatusAction | SetSelectionAction | SetSettingsAction;
