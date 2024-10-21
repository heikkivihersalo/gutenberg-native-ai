/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import style from '../index.module.css';

type Props = {
	label: string;
	icon: JSX.Element;
	subMenuValue: string;
	subMenuLabel?: string;
	subMenuOptions?: Array<{ value: string; label: string }>;
	subMenuCallback: (value: string) => void;
};

/**
 * SettingsNavItem component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the navigation item
 * @param {JSX.Element} props.icon - Icon for the navigation item
 * @param {string} props.subMenuValue - Value for the sub menu
 * @param {string} props.subMenuLabel - Label for the sub menu
 * @param {Array<{ value: string; label: string }>} props.subMenuOptions - Options for the sub menu
 * @param {Function} props.subMenuCallback - Callback for the sub menu
 * @return {JSX.Element} Model navigation component
 */
const SettingsNavItem = ({
	label,
	icon,
	subMenuValue,
	subMenuLabel = '',
	subMenuOptions = [],
	subMenuCallback,
}: Props): JSX.Element => {
	const [subMenuanchor, setSubMenuanchor] = useState<HTMLElement | null>(
		null
	);
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const handleMenuOpen = () => {
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	return (
		<li>
			<button
				className={style.navListItem}
				onClick={handleMenuOpen}
				ref={setSubMenuanchor}
			>
				<span className={style.navListItemLabel}>
					{icon}
					{label}
				</span>
				<svg
					width="5"
					height="9"
					viewBox="0 0 5 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.82376 4.10274C5.05814 4.32247 5.05814 4.6793 4.82376 4.89903L1.22376 8.27403C0.98939 8.49376 0.608765 8.49376 0.37439 8.27403C0.140015 8.0543 0.140015 7.69747 0.37439 7.47774L3.55064 4.50001L0.376265 1.52227C0.14189 1.30255 0.14189 0.945709 0.376265 0.725983C0.61064 0.506256 0.991264 0.506256 1.22564 0.725983L4.82564 4.10098L4.82376 4.10274Z"
						fill="#1E1E1E"
					/>
				</svg>
			</button>
			{isSubMenuOpen ? (
				<Popover placement="right-end" anchor={subMenuanchor}>
					<ul className={`${style.navList} ${style.subNavContainer}`}>
						<span className={style.navLabel}>{subMenuLabel}</span>
						{subMenuOptions.map((option) => (
							<li key={option.value}>
								<button
									className={style.navListItem}
									onClick={() =>
										subMenuCallback(option.value)
									}
								>
									<span className={style.navListItemLabel}>
										{option.label}
									</span>
									{subMenuValue === option.value ? (
										<svg
											className={
												style.navListItemCheckMark
											}
											width="11"
											height="9"
											viewBox="0 0 11 9"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.7698 1.0592C11.0767 1.37165 11.0767 1.87907 10.7698 2.19152L4.48482 8.59052C4.17794 8.90297 3.67956 8.90297 3.37267 8.59052L0.230164 5.39102C-0.0767213 5.07857 -0.0767213 4.57115 0.230164 4.2587C0.537049 3.94625 1.03543 3.94625 1.34232 4.2587L3.92997 6.89079L9.66014 1.0592C9.96702 0.746747 10.4654 0.746747 10.7723 1.0592H10.7698Z"
												fill="#1E1E1E"
											/>
										</svg>
									) : null}
								</button>
							</li>
						))}
					</ul>
				</Popover>
			) : null}
		</li>
	);
};

export default SettingsNavItem;
