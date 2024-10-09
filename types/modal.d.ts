/**
 * External dependencies
 */
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { MODAL_STATUS } from '@constants/modal';

/**
 * Data types
 */
type ModalStatus = (typeof MODAL_STATUS)[keyof typeof MODAL_STATUS];

type ModalSelection = {
	block?: BlockInstance | null;
	text: string;
	start: number;
	end: number;
};

type ModalSettings = {
	model: 'text' | 'image';
	[key: string]: any;
};
