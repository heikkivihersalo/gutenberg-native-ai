type ChatGPTChoice = {
	index: Number;
	message: {
		role: string;
		content: string;
	};
	logprobs: null;
	finish_reason: string;
};

type ChatGPTTextResponse = {
	id: string;
	object: string;
	created: Number;
	model: string;
	choices: Array<ChatGPTChoice>;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
	system_fingerprint: string;
};

type ChatGPTImage = {
	b64_json?: string;
	url: string;
	revised_prompt?: string;
};

type ChatGPTImageResponse = {
	created: number;
	data: Array<ChatGPTImage>;
};

type ChatGPTErrorInvalidKey = {
	error: {
		code: string;
		message: string;
		param: null;
		type: string;
	};
};

type ChatGPTError = ChatGPTErrorInvalidKey;

type ChatGPTResponse =
	| ChatGPTTextResponse
	| ChatGPTImageResponse
	| ChatGPTError;
