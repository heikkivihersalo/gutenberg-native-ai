/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from '../../index.module.css';

/**
 * Header
 * @return {JSX.Element} Form Button Component
 */
const FormContainer = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	return (
		<div className={styles.formContainer}>
			<h2 className={styles.formContainerHeading}>
				{__('ChatGPT', 'gutenberg-native-ai')}
			</h2>
			<p
				className={styles.formContainerDescription}
				dangerouslySetInnerHTML={{
					__html: sprintf(
						/* translators: %s: ChatGPT dashboard URL */
						__(
							'Configure the ChatGPT API settings. You can get the API key from the ChatGPT dashboard. Access the dashboard <a href="%s">here</a>.',
							'gutenberg-native-ai'
						),
						'https://platform.openai.com/api-keys'
					),
				}}
			/>
			{children}
		</div>
	);
};

export default FormContainer;
