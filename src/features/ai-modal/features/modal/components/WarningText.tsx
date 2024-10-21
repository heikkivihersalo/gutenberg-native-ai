/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from '../index.module.css';

/**
 * WarningText component
 * @return {JSX.Element} Form component
 */
const WarningText = (): JSX.Element => {
	return (
		<p className={styles.warningText}>
			{__(
				'AI generated content may not be accurate. Always review the content before publishing.',
				'gutenberg-native-ai'
			)}
		</p>
	);
};

export default WarningText;
