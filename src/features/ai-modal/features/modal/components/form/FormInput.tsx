/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from '../../index.module.css';

/**
 * FormInput component
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Textarea placeholder
 * @return {JSX.Element} Textarea component
 */
const FormInput = ({ placeholder }: { placeholder: string }): JSX.Element => {
	return (
		<div>
			<label className={styles.formInputLabel} htmlFor="prompt">
				{__('Prompt', 'gutenberg-native-ai')}
			</label>
			<textarea
				id="prompt"
				className={styles.formInput}
				name="prompt"
				rows={1}
				placeholder={placeholder}
			></textarea>
		</div>
	);
};

export default FormInput;
