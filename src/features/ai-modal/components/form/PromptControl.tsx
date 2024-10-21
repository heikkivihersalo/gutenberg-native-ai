/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { MODAL_STATUS } from '@constants/modal';
import Settings from '../settings';

import styles from './PromptControl.module.css';

type Props = {
	status: string;
	placeholder: string;
};

/**
 * Form component
 * @param {Props} props - Component props
 * @param {string} props.status - Form status
 * @param {string} props.placeholder - Form placeholder
 * @return {JSX.Element} Form component
 */
const PromptControl = ({ status, placeholder }: Props): JSX.Element => {
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(
		null
	);
	const { setStatus, setSelection } = useDispatch('theme/ai');

	return (
		<div className={styles.textareaContainer}>
			<div>
				<label className={styles.textareaLabel} htmlFor="prompt">
					{__('Prompt', 'gutenberg-native-ai')}
				</label>
				<textarea
					id="prompt"
					className={styles.textareaInput}
					name="prompt"
					rows={1}
					placeholder={placeholder}
				></textarea>
			</div>
			<button
				type="submit"
				className={styles.buttonSubmit}
				disabled={status === MODAL_STATUS.LOADING}
			>
				{status === MODAL_STATUS.LOADING ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
					>
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
			<button
				type="button"
				className={styles.buttonClose}
				aria-label={__('Close', 'gutenberg-native-ai')}
				onClick={() => {
					setStatus(MODAL_STATUS.INITIAL);
					setSelection({
						block: null,
						text: '',
						start: 0,
						end: 0,
					});
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
				</svg>
			</button>
			<button
				type="button"
				ref={setSettingsAnchor}
				className={styles.buttonSettings}
				aria-label={__('Prompt Modal Settings', 'gutenberg-native-ai')}
				onClick={() => {
					setSettingsVisible(!settingsVisible);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"></path>
				</svg>
			</button>
			<Settings
				settingsVisible={settingsVisible}
				anchor={settingsAnchor}
			/>
		</div>
	);
};

export default PromptControl;
