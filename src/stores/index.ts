/**
 * WordPress dependencies
 */
import { createReduxStore, combineReducers, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import actions from './data/actions.ts';
import controls from './data/controls.ts';
import { status, selection, settings, mode } from './data/reducer.ts';
import resolvers from './data/resolvers.ts';
import selectors from './data/selectors.ts';

import { DATA_STORE } from '@constants/stores.ts';

const Store = createReduxStore(DATA_STORE, {
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
});

register(Store);
