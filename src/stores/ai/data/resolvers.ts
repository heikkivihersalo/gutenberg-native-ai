/**
 * Internal dependencies
 */
import actions from './actions';
import { API_PATH } from '@constants/api';

import {
	GetSettingsAction,
	SetSettingsAction,
	SettingsApiResponse,
} from 'types/store';

/**
 * Resolvers for the store.
 */
const resolvers = {
	/**
	 * Get generator function
	 * @return {Generator<GetSettingsAction, SetSettingsAction, SettingsApiResponse>} Action object
	 */
	*getSettings(): Generator<
		GetSettingsAction,
		SetSettingsAction,
		SettingsApiResponse
	> {
		const result = yield actions.getSettings(API_PATH.GET_SETTINGS);
		return actions.setSettings({
			model: result.data.model,
			tone_of_voice: result.data.tone_of_voice,
		});
	},
};

export default resolvers;
