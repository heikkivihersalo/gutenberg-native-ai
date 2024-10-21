/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import actions from './data/actions.ts';
import controls from './data/controls.ts';
import { status, selection, settings, mode } from './data/reducer.ts';
import resolvers from './data/resolvers.ts';
import selectors from './data/selectors.ts';

/**
 * Store constants
 */
export const STORE_NAME = 'theme/ai';
export const STORE_CONFIG = {
	actions,
	controls,
	reducer: combineReducers({
		status,
		selection,
		settings,
		mode,
	}),
	resolvers,
	selectors,
};
