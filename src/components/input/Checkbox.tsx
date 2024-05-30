import classNames from "classnames";

interface CheckboxProps {
	isChecked: boolean;
	onCheck: (isChecked: boolean) => void;
	classes?: string;
}

/**
 * Custom checkbox component.
 *
 * @param isChecked - Whether the checkbox is checked.
 * @param onCheck - Function to run when the checkbox is checked.
 * @param classes - Additional classes to apply to the checkbox.
 */
export const Checkbox = ({isChecked, onCheck, classes}: CheckboxProps) => {
	return (
		<div className={classNames("flex items-center gap-2", classes)}>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={(e) => onCheck(e.target.checked)}
				className="w-5 h-5 cursor-pointer"
				tabIndex={0}
			/>
		</div>
	)
}