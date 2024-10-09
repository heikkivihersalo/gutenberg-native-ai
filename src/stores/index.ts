/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * AI Store
 */
import { STORE_NAME as AI_STORE_NAME, STORE_CONFIG as AIConfig } from './ai';

const AIStore = createReduxStore(AI_STORE_NAME, AIConfig);

register(AIStore);
