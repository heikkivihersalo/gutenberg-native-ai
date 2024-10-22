/**
 * External dependencies
 */
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { MODAL_STATUS, MODAL_MODE } from '@constants/modal';

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

type ModalMode = (typeof MODAL_MODE)[keyof typeof MODAL_MODE];

type ModalSettings = {
	model: string;
	tone_of_voice: string;
	has_api_key: boolean;
	[key: string]: any;
};
