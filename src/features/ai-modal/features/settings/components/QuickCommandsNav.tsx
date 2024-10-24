/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import style from '../index.module.css';

/**
 * Quick commands navigation component
 * @return {JSX.Element} Quick commands navigation component
 */
const QuickCommandsNav = (): JSX.Element => {
	return (
		<div className={style.navContainer}>
			<div className={style.navLabel}>
				{__('Quick Commands', 'gutenberg-native-ai')}
			</div>
			<ul className={style.navList}></ul>
		</div>
	);
};

export default QuickCommandsNav;
