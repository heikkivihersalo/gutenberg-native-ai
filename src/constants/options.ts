import { __ } from '@wordpress/i18n';

export const OPEN_AI_TEXT_MODEL = [
	{ value: 'gpt-4o', label: __('GPT-4o', 'gutenberg-native-ai') },
	{ value: 'gpt-4o-mini', label: __('GPT-4o mini', 'gutenberg-native-ai') },
];

export const OPEN_AI_IMAGE_MODEL = [
	{ value: 'dall-e-3', label: __('DALL-E 3', 'gutenberg-native-ai') },
	{ value: 'dall-e-2', label: __('DALL-E 2', 'gutenberg-native-ai') },
];

export const TONE_OF_VOICE = [
	{ value: 'none', label: __('None', 'gutenberg-native-ai') },
	{
		value: 'friendly-professional',
		label: __('Friendly and Professional', 'gutenberg-native-ai'),
	},
	{
		value: 'authoritative-informative',
		label: __('Authoritative and Informative', 'gutenberg-native-ai'),
	},
	{
		value: 'urgent-persuasive',
		label: __('Urgent and Persuasive', 'gutenberg-native-ai'),
	},
	{
		value: 'casual-conversational',
		label: __('Casual and Conversational', 'gutenberg-native-ai'),
	},
	{
		value: 'professional-trustworthy',
		label: __('Professional and Trustworthy', 'gutenberg-native-ai'),
	},
	{
		value: 'humorous-informal',
		label: __('Humorous and Informal', 'gutenberg-native-ai'),
	},
	{
		value: 'professional-straightforward',
		label: __('Professional and Straightforward', 'gutenberg-native-ai'),
	},
	{
		value: 'serious-empathetic',
		label: __('Serious and Empathetic', 'gutenberg-native-ai'),
	},
	{
		value: 'positive-enthusiastic',
		label: __('Positive and Enthusiastic', 'gutenberg-native-ai'),
	},
	{
		value: 'authoritative-professional',
		label: __('Authoritative and Professional', 'gutenberg-native-ai'),
	},
	{
		value: 'casual-funny',
		label: __('Casual and Funny', 'gutenberg-native-ai'),
	},
	{
		value: 'authoritative-expert',
		label: __('Authoritative and Expert', 'gutenberg-native-ai'),
	},
];

export const AVAILABLE_LANGUAGES = [
	{ value: 'zh', label: __('Chinese', 'gutenberg-native-ai') },
	{ value: 'nl', label: __('Dutch', 'gutenberg-native-ai') },
	{ value: 'en', label: __('English', 'gutenberg-native-ai') },
	{ value: 'fi', label: __('Finnish', 'gutenberg-native-ai') },
	{ value: 'fr', label: __('French', 'gutenberg-native-ai') },
	{ value: 'de', label: __('German', 'gutenberg-native-ai') },
	{ value: 'it', label: __('Italian', 'gutenberg-native-ai') },
	{ value: 'ja', label: __('Japanese', 'gutenberg-native-ai') },
	{ value: 'ko', label: __('Korean', 'gutenberg-native-ai') },
	{ value: 'no', label: __('Norwegian', 'gutenberg-native-ai') },
	{ value: 'pl', label: __('Polish', 'gutenberg-native-ai') },
	{ value: 'pt', label: __('Portuguese', 'gutenberg-native-ai') },
	{ value: 'ro', label: __('Romanian', 'gutenberg-native-ai') },
	{ value: 'ru', label: __('Russian', 'gutenberg-native-ai') },
	{ value: 'es', label: __('Spanish', 'gutenberg-native-ai') },
	{ value: 'sv', label: __('Swedish', 'gutenberg-native-ai') },
	{ value: 'tr', label: __('Turkish', 'gutenberg-native-ai') },
	{ value: 'vi', label: __('Vietnamese', 'gutenberg-native-ai') },
	{ value: 'emoji', label: __('Emoji', 'gutenberg-native-ai') },
];
