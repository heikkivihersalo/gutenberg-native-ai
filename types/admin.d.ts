import { ApiPath } from './api';

/**
 * ChatGPT
 */
type ChatGPTAdminFormProps = {
	path: ApiPath;
	nonce: string | undefined;
};

type ChatGPTFormData = {
	model_text: string;
	model_image: string;
	api_key: string;
	tone_of_voice: string;
};

type ChatGPTAdminApiResponse = {
	status: string;
	type: string;
	message: string;
	data: ChatGPTFormData;
};

/**
 * Admin Request Types
 */
type AdminFormProps = ChatGPTAdminFormProps;

type AdminFormData = ChatGPTFormData;

type AdminApiResponse = ChatGPTAdminApiResponse;

type AdminFormHook = {
	formData: AdminFormData;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	handleSave: ({ data }: { data: AdminFormData }) => void;
};
