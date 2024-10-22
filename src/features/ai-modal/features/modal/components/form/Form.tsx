/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { MODAL_STATUS } from '@constants/modal';
import CloseButton from '../CloseButton';

import styles from '../../index.module.css';

/**
 * Form component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form children
 * @param {Function} props.onSubmit - Form submit handler
 * @return {JSX.Element} Form component
 */
const Form = ({
	children,
	onSubmit,
	hasApiKey = false,
}: {
	children: React.ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	hasApiKey: boolean;
}): JSX.Element => {
	const { setStatus, setSelection } = useDispatch('theme/ai');

	const handleClose = () => {
		setStatus(MODAL_STATUS.INITIAL);
		setSelection({
			block: null,
			text: '',
			start: 0,
			end: 0,
		});
	};

	return (
		<div className={styles.formContainer} data-api-active={hasApiKey}>
			<form className={styles.form} onSubmit={onSubmit}>
				{children}
			</form>
			{!hasApiKey ? (
				<>
					<div className={styles.formOverlay}>
						<p>
							Please create your API key in the{' '}
							<a
								href="https://platform.openai.com/api-keys"
								target="_blank"
								rel="noreferrer"
							>
								OpenAI dashboard
							</a>{' '}
							and add it to the{' '}
							<a
								href="/wp-admin/options-general.php?page=gutenberg-native-ai"
								target="_blank"
								rel="noreferrer"
							>
								plugin options
							</a>{' '}
							to enable the AI features
						</p>
					</div>
					<CloseButton closeCallback={handleClose} />
				</>
			) : null}
		</div>
	);
};

export default Form;
