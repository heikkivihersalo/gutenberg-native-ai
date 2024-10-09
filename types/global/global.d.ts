export {};

declare global {
	type gutenbergNativeAiSettings = {
		nonce: string;
	};

	interface Window {
		gutenbergNativeAiSettings?: gutenbergNativeAiSettings;
	}
}
