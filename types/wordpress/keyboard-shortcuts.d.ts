declare module '@wordpress/keyboard-shortcuts' {
	import { ReactNode } from 'react';
	import { StoreDescriptor } from '@wordpress/data';

	export function useShortcut(
		name: string,
		useCallback: (event: KeyboardEvent) => void
	): void;

	export function ShortcutProvider(
		props: any,
		deprecatedLegacyContext?: any
	): ReactNode;

	export const store: string | StoreDescriptor | undefined;
}
