declare module '@hooks' {
	export type ChatGPTPromptInput = {
		prompt: FormDataEntryValue | null;
		selection?: string;
	};

	export type ChatGPTTranslateInput = {
		selection: string;
		languageFrom;
		languageTo;
	};

	export const useChatGPT: () => {
		getText: ({ prompt, selection }: ChatGPTPromptInput) => Promise<string>;
		getImage: ({ prompt }: ChatGPTPromptInput) => Promise<ChatGPTImage[]>;
		translate: ({
			selection,
			languageFrom,
			languageTo,
		}: ChatGPTTranslateInput) => Promise<string>;
	};

	export const useAdminForm: (props: AdminFormProps) => {
		formData: AdminFormData;
		setFormData: (data: AdminFormData) => void;
		handleChange: FormOnChange;
		handleSave: ({ data }: { data: AdminFormData }) => void;
	};
}
