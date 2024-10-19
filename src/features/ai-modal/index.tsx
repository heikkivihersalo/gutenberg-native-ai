/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import BlockEditControl from './components/BlockEditControl';

declare const wp: WPAny;

/**
 * Filters
 */
addFilter(
	'editor.BlockEdit',
	'gutenberg-native-ai/ai-prompt-controls',
	BlockEditControl
);

/**
 * Register the AI shortcuts
 */
wp.data.dispatch('core/keyboard-shortcuts').registerShortcut({
	name: 'gutenberg-native-ai/shortcut-ai-open' /* unique identifier */,
	category: 'block' /* global, block, selection */,
	description:
		'Shortcut to open the open-ai popover' /* human-readable description */,
	keyCombination: {
		modifier: 'primary',
		character: '.',
	},
});
