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
