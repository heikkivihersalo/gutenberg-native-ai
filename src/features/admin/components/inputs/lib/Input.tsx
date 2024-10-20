/**
 * Internal dependencies
 */
import styles from './Input.module.css';

/**
 * Component for number input
 * @param {Object} props - Component props
 * @param {FormInputType} props.type - Type of the input
 * @param {string} props.label - Label for the input
 * @param {string} props.name - Name for the input
 * @param {string} props.value - Value for the input
 * @param {string} props.placeholder - Placeholder for the input
 * @param {Function} props.onChange - Change handler for the input
 * @param {boolean} props.disabled - Disabled state for the input
 * @return {JSX.Element} Text input component
 */
const Input = ({
	type,
	label,
	name,
	value,
	placeholder = '',
	onChange = () => {},
	disabled = false,
}: FormInputProps): JSX.Element => {
	return (
		<div className={styles.input}>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				defaultValue={value}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
		</div>
	);
};

export { Input };
