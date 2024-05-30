interface AddTodoButtonProps {
	onClick: () => void;
	value: string
}

/**
 * Button to add a todo item.
 *
 * @param onClick - Function to run when the button is clicked.
 * @param value - The value of the input field.
 */
export const AddTodoButton = ({onClick, value}: AddTodoButtonProps) => {
	return (
		<button
			className="bg-sky-600 text-neutral-100 transition rounded-md text-lg py-1.5 px-4 font-medium enabled:hover:bg-sky-700 enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-sky-700 enabled:focus:ring-opacity-50 disabled:opacity-30 disabled:cursor-not-allowed"
			onClick={onClick} disabled={value === ""}
		>
			Add
		</button>
	)
}