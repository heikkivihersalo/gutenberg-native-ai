/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import actions from './data/actions.ts';
import { status, selection, settings } from './data/reducer.ts';
import selectors from './data/selectors.ts';

/**
 * Store constants
 */
export const STORE_NAME = 'theme/ai';
export const STORE_CONFIG = {
	selectors,
	actions,
	reducer: combineReducers({
		status,
		selection,
		settings,
	}),
};
