/**
 * Internal dependencies
 */
import styles from './Select.module.css';

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
const Select = ({
	label,
	name,
	value,
	options,
	onChange,
}: FormSelectProps): JSX.Element => {
	return (
		<div className={styles.select}>
			<label htmlFor={name}>{label}</label>
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

export { Select };
