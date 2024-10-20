import { ApiPath } from './api';

type ChatGPTAdminRequestData = {
	model: ChatGPTAdminApiResponse['data']['model'];
	api_key: ChatGPTAdminApiResponse['data']['api_key'];
	tone_of_voice: string;
};

type AdminRequestData = ChatGPTAdminRequestData;

type ChatGPTAdminApiResponse = {
	status: string;
	type: string;
	message: string;
	data: {
		model: string;
		api_key: string;
		tone_of_voice: string;
	};
};

type AdminApiResponse = ChatGPTAdminApiResponse;

type ChatGPTAdminFormProps = {
	path: ApiPath;
	nonce: string | undefined;
};

type AdminFormProps = ChatGPTAdminFormProps;

type AdminFormHook = {
	formData: AdminRequestData;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	handleSave: ({ data }: { data: AdminRequestData }) => void;
};
