/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './Select.module.css';

/**
 * Select Component
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
