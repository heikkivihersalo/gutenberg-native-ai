/**
 * Because WordPress is hard to type in some cases, we can use this file to define difficult types for WordPress
 * This can be also used as a todo list when good typings are found for certain WordPress functions
 */
type WPAny = any;

type BlockEditProps = {
	attributes: Record<string, any>;
	clientId: string;
	context: {
		postId: number;
		postType: string;
	};
	insertBlocksAfter: (...args: any[]) => void;
	isSelected: boolean;
	isSelectionEnabled: boolean;
	mergeBlocks: (...args: any[]) => void;
	name: string;
	onRemove: () => void;
	onReplace: (...args: any[]) => void;
	setAttributes: (...args: any[]) => void;
	toggleSelection: (...args: any[]) => void;
};
