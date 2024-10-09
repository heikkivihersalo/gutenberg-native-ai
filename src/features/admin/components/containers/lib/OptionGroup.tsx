/**
 * Internal dependencies
 */
import styles from './OptionGroup.module.css';

type OptionGroupProps = {
	children: React.ReactNode;
};

/**
 * OptionGroup Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @return {JSX.Element} OptionGroup component
 */
const OptionGroup = ({ children }: OptionGroupProps): JSX.Element => {
	return <div className={styles.group}>{children}</div>;
};

export { OptionGroup };
