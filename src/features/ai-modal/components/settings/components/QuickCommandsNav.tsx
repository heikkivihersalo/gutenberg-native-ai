/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import QuickCommandsNavItem from './QuickCommandsNavItem';

import style from '../index.module.css';

/**
 * Quick commands navigation component
 * @return {JSX.Element} Quick commands navigation component
 */
const QuickCommandsNav = () => {
	return (
		<div className={style.navContainer}>
			<div className={style.navLabel}>
				{__('Quick Commands', 'gutenberg-native-ai')}
			</div>
			<ul className={style.navList}>
				<QuickCommandsNavItem
					label={__('Translate', 'gutenberg-native-ai')}
					icon={
						<svg
							width="17"
							height="11"
							viewBox="0 0 17 11"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 2.25C0 1.35371 0.762344 0.625 1.7 0.625H6.8H8.075H8.5H15.3C16.2377 0.625 17 1.35371 17 2.25V8.75C17 9.64629 16.2377 10.375 15.3 10.375H8.5H8.075H6.8H1.7C0.762344 10.375 0 9.64629 0 8.75V2.25ZM8.5 2.25V8.75H15.3V2.25H8.5ZM4.73609 3.46621C4.65109 3.2834 4.45984 3.16406 4.25 3.16406C4.04016 3.16406 3.84891 3.2834 3.76391 3.46621L2.06391 7.12246C1.94437 7.37891 2.06656 7.67852 2.33484 7.79277C2.60313 7.90703 2.91656 7.79023 3.03609 7.53379L3.2725 7.02344H5.2275L5.46391 7.53379C5.58344 7.79023 5.89688 7.90449 6.16516 7.79277C6.43344 7.68105 6.55297 7.37891 6.43609 7.12246L4.73609 3.46621ZM4.25 4.92109L4.75469 6.00781H3.74531L4.25 4.92109ZM11.9 3.16406C12.1922 3.16406 12.4313 3.39258 12.4313 3.67188V3.77344H13.6H14.025C14.3172 3.77344 14.5563 4.00195 14.5563 4.28125C14.5563 4.56055 14.3172 4.78906 14.025 4.78906H13.9719L13.9294 4.90332C13.693 5.52285 13.3344 6.08652 12.8775 6.56387C12.9014 6.5791 12.9253 6.5918 12.9492 6.60449L13.4513 6.89141C13.7036 7.03613 13.7833 7.34844 13.6345 7.58711C13.4858 7.82578 13.1564 7.90449 12.9067 7.7623L12.4047 7.47539C12.2852 7.40684 12.1709 7.33574 12.0567 7.25957C11.7752 7.45 11.475 7.61504 11.1536 7.75215L11.058 7.79277C10.7897 7.90703 10.4762 7.79023 10.3567 7.53379C10.2372 7.27734 10.3594 6.97773 10.6277 6.86348L10.7233 6.82285C10.8933 6.74922 11.058 6.66797 11.2147 6.57402L10.8906 6.26426C10.6834 6.06621 10.6834 5.74375 10.8906 5.5457C11.0978 5.34766 11.4352 5.34766 11.6423 5.5457L12.0302 5.91641L12.0434 5.9291C12.3728 5.59648 12.6411 5.21055 12.835 4.78652L11.9 4.78906H9.9875C9.69531 4.78906 9.45625 4.56055 9.45625 4.28125C9.45625 4.00195 9.69531 3.77344 9.9875 3.77344H11.3688V3.67188C11.3688 3.39258 11.6078 3.16406 11.9 3.16406Z"
								fill="#1E1E1E"
							/>
						</svg>
					}
					selectCallback={() => {}}
					hasSubMenu
				/>
			</ul>
		</div>
	);
};

export default QuickCommandsNav;