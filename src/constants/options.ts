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
	{ value: 'chinese', label: __('Chinese', 'gutenberg-native-ai') },
	{ value: 'dutch', label: __('Dutch', 'gutenberg-native-ai') },
	{ value: 'english', label: __('English', 'gutenberg-native-ai') },
	{ value: 'finnish', label: __('Finnish', 'gutenberg-native-ai') },
	{ value: 'french', label: __('French', 'gutenberg-native-ai') },
	{ value: 'german', label: __('German', 'gutenberg-native-ai') },
	{ value: 'italian', label: __('Italian', 'gutenberg-native-ai') },
	{ value: 'japanese', label: __('Japanese', 'gutenberg-native-ai') },
	{ value: 'korean', label: __('Korean', 'gutenberg-native-ai') },
	{ value: 'norwegian', label: __('Norwegian', 'gutenberg-native-ai') },
	{ value: 'polish', label: __('Polish', 'gutenberg-native-ai') },
	{ value: 'portugese', label: __('Portuguese', 'gutenberg-native-ai') },
	{ value: 'romanian', label: __('Romanian', 'gutenberg-native-ai') },
	{ value: 'russian', label: __('Russian', 'gutenberg-native-ai') },
	{ value: 'spanish', label: __('Spanish', 'gutenberg-native-ai') },
	{ value: 'swedish', label: __('Swedish', 'gutenberg-native-ai') },
	{ value: 'turkish', label: __('Turkish', 'gutenberg-native-ai') },
	{ value: 'vietnamese', label: __('Vietnamese', 'gutenberg-native-ai') },
	{ value: 'emoji', label: __('Emoji', 'gutenberg-native-ai') },
];
