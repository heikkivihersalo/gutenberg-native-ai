/**
 * Internal dependencies
 */
import styles from '../../index.module.css';

/**
 * Select Component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the select
 * @param {string} props.name - Name of the select
 * @param {string} props.value - Value of the select
 * @param {Array} props.options - Options for the select
 * @param {Function} props.onChange - Change handler for the select
 * @return {JSX.Element} Toggle component
 */
const FormSelect = ({
	label,
	name,
	value,
	options,
	onChange,
}: FormSelectProps): JSX.Element => {
	return (
		<div className={styles.formInputWrapper}>
			<label className={styles.formInputLabel} htmlFor={name}>
				{label}
			</label>
			<select
				id={name}
				name={name}
				value={value || undefined}
				onChange={onChange}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default FormSelect;
