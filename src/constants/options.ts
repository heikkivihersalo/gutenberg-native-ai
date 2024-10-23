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
