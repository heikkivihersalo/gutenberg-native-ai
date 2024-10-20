type FormInputType = 'text' | 'textarea' | 'number' | 'email';

type FormInputProps = {
	type: FormInputType;
	label: string;
	name: string;
	value: string | number | readonly string[] | undefined;
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
};

type FormToggleProps = {
	label: string;
	name: string;
	checked: boolean;
	onChange: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
	hideLabel?: boolean;
};

type FormSelectProps = {
	label: string;
	name: string;
	value: string;
	options: Array<{ value: string; label: string }>;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type FormOnChangeEvent = React.ChangeEvent<
	HTMLInputElement | HTMLSelectElement
>;

type FormOnChange =
	| FormInputProps['onChange']
	| FormSelectProps['onChange']
	| FormToggleProps['onChange'];
