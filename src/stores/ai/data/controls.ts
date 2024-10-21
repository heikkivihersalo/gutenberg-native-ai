/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import type { GetSettingsAction } from 'types/store';

/**
 * Controls for the store
 */
const controls = {
	/**
	 * Get data from API endpoint
	 * @param {GetSettingsAction} action Action object
	 * @return {Promise<unknown>} Promise object
	 */
	GET_SETTINGS(action: GetSettingsAction): Promise<unknown> {
		return apiFetch({ path: action.payload });
	},
};

export default controls;
