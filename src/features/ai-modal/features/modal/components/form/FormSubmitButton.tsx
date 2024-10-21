/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { MODAL_STATUS } from '@constants/modal';
import type { ModalStatus } from 'types/modal';

import styles from '../../index.module.css';

/**
 * SubmitButton component
 * @param {Object} props - Component props
 * @param {string} props.status - Popover status
 * @return {JSX.Element} SubmitButton component
 */
const FormSubmitButton = ({ status }: { status: ModalStatus }): JSX.Element => {
	return (
		<button
			type="submit"
			className={styles.formButtonSubmit}
			disabled={status === MODAL_STATUS.LOADING}
		>
			{status === MODAL_STATUS.LOADING ? (
				<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
					<style>
						{
							'@keyframes spinner_KYSC{to{transform:rotate(360deg)}}'
						}
					</style>
					<path
						d="M12 4a8 8 0 0 1 7.89 6.7 1.53 1.53 0 0 0 1.49 1.3 1.5 1.5 0 0 0 1.48-1.75 11 11 0 0 0-21.72 0A1.5 1.5 0 0 0 2.62 12a1.53 1.53 0 0 0 1.49-1.3A8 8 0 0 1 12 4Z"
						style={{
							transformOrigin: 'center',
							animation: 'spinner_KYSC .75s infinite linear',
						}}
					/>
				</svg>
			) : (
				__('Generate', 'gutenberg-native-ai')
			)}
		</button>
	);
};

export default FormSubmitButton;
