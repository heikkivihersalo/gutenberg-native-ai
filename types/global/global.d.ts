export {};

declare global {
	type LocalizedScript = {
		nonce: string;
	};

	interface Window {
		GUTENBERG_NATIVE_AI?: LocalizedScript;
	}
}
