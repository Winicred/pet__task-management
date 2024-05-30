import {useState, KeyboardEvent, useRef} from "react";
import {useActionCreators} from "@/stores/hooks.ts";
import {todoActions} from "@/stores/slices/todo.ts";
import classNames from "classnames";
import {AddTodoButton} from "@/components/button";

// Maximum character limit for the input field.
export const LENGTH_LIMIT = 1000;

/**
 * Input field for adding new todos.
 */
export const InputField = () => {
	const [value, setValue] = useState<string>("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const todoFunctions = useActionCreators(todoActions);

	/**
	 * Function to handle the submission of a new todo.
	 */
	const handleSubmit = (): void => {
		if (value === "") return;

		todoFunctions.add({
			text: value,
			isCompleted: false
		});

		setValue("");
	}

	/**
	 * Function to handle keydown events.
	 */
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "inherit";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}

		if (e.key === "Enter") {
			e.preventDefault();

			handleSubmit();
			if (textareaRef.current) {
				textareaRef.current.style.height = "56px";

				textareaRef.current.focus();
			}

			return;
		}
	}

	return (
		<div className="flex flex-col gap-3 mb-6">
			<div className="flex flex-col gap-1">
				<textarea
					className="border p-2 w-96 resize-none bg-neutral-900 max-h-40 border-neutral-700 text-sm transition text-neutral-100 hover:bg-neutral-800 ring-2 ring-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-neutral-600 focus:ring-opacity-50 focus:bg-neutral-800"
					style={{height: "56px"}}
					placeholder="Enter a task"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					ref={textareaRef}
					maxLength={LENGTH_LIMIT}
					autoFocus={true}
				/>

				<span className={classNames("text-right text-xs font-medium", value.length === LENGTH_LIMIT ? "text-red-500" : value.length > (LENGTH_LIMIT - 50) ? "text-orange-500" : "text-neutral-500")}>
					{value.length} / {LENGTH_LIMIT}
				</span>
			</div>

			<AddTodoButton onClick={handleSubmit} value={value} />
		</div>
	)
}