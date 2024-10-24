/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { AVAILABLE_LANGUAGES } from '@constants/options';
import { DATA_STORE } from '@constants/stores';

import type { ModalLanguages, ModalSelection } from 'types/modal';

import styles from '../../index.module.css';

/**
 * LanguageSelector component
 * @return {JSX.Element} LanguageSelector component
 */
const LanguageSelector = (): JSX.Element => {
	const { languages, selection } = useSelect((select: WPAny) => {
		return {
			languages: select(DATA_STORE).getLanguages() as ModalLanguages,
			selection: select(DATA_STORE).getSelection() as ModalSelection,
		};
	}, []);

	const { setLanguages } = useDispatch(DATA_STORE);

	const hasSelection = selection.start !== selection.end;

	return (
		<div className={styles.languageSelector}>
			{hasSelection ? (
				<>
					<div className={styles.languageSelectorInputWrapper}>
						<label
							className={styles.languageSelectorLabel}
							htmlFor="language-from"
						>
							{__('From', 'gutenberg-native-ai')}
						</label>
						<select
							id="language-from"
							className={styles.languageSelectorInput}
							name="language-from"
							value={languages.from || undefined}
							onChange={(e) =>
								setLanguages({
									...languages,
									from: e.target.value,
								})
							}
							disabled={!hasSelection}
						>
							{AVAILABLE_LANGUAGES.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					<div className={styles.languageSelectorInputWrapper}>
						<label
							className={styles.languageSelectorLabel}
							htmlFor="language-to"
						>
							{__('To', 'gutenberg-native-ai')}
						</label>
						<select
							id="language-to"
							className={styles.languageSelectorInput}
							name="language-to"
							value={languages.to || undefined}
							onChange={(e) =>
								setLanguages({
									...languages,
									to: e.target.value,
								})
							}
						>
							{AVAILABLE_LANGUAGES.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</>
			) : (
				<p className={styles.languageSelectorWarningText}>
					{__(
						'You currently have no text selected. Please close the modal and select text to create translations.',
						'gutenberg-native-ai'
					)}
				</p>
			)}
		</div>
	);
};

export default LanguageSelector;
