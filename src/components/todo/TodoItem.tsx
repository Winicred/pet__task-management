import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import {Todo} from "@/entities/Todo.ts";
import {Checkbox} from "@/components/input/Checkbox.tsx";
import {useActionCreators} from "@/stores/hooks.ts";
import {todoActions} from "@/stores/slices/todo.ts";
import classNames from "classnames";
import {LENGTH_LIMIT} from "@/components/input/InputField.tsx";

/**
 * Component to display a single todo item.
 *
 * @param todo - The todo item to display.
 * @param isLastItem - Whether the todo item is the last in the list (used to determine if a border should be displayed).
 */
export const TodoItem = ({todo, isLastItem}: { todo: Todo, isLastItem: boolean }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedText, setEditedText] = useState<string>(todo.text);

	const todoFunctions = useActionCreators(todoActions);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	/**
	 * Handle the editing of a todo item.
	 */
	const handleEdit = () => {
		setEditedText(todo.text);
		setIsEditing(true);
	}

	/**
	 * Handle the blur event of the todo item.
	 */
	const handleBlur = () => {
		setIsEditing(false);
		if (editedText.length === 0) {
			todoFunctions.delete(todo.id);
			return;
		}

		todoFunctions.edit({id: todo.id, text: editedText});
	}

	/**
	 * Handle the change event of the todo item.
	 */
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setEditedText(e.target.value);
	}

	/**
	 * Handle the keydown event of the todo item.
	 */
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleBlur();
		}
  };

	/**
	 * Function to format a date into a readable time format.
	 * @param date - The date to format.
	 * @returns The formatted date.
	 */
	const formatDate = (date: number): string => {
		const hours = new Date(date).getHours();
		const minutes = new Date(date).getMinutes();
		const seconds = new Date(date).getSeconds();

		return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
	}

	/**
	 * Set the textarea pointer to the end of the text.
	 */
	useEffect(() => {
		if (isEditing && textareaRef.current) {
			textareaRef.current.selectionStart = editedText.length;
			textareaRef.current.selectionEnd = editedText.length;
		}
	}, [isEditing]);
	
	return (
		<div className={classNames("flex items-center gap-2 py-2", !isLastItem && "border-b border-b-neutral-700")}>
			<Checkbox isChecked={todo.isCompleted} onCheck={() => todoFunctions.toggle(todo.id)} classes="mb-auto"/>

			{isEditing ? (
				<textarea
					value={editedText}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					autoFocus
					ref={textareaRef}
					maxLength={LENGTH_LIMIT}
					className="border resize-none w-full p-2 border-neutral-700 text-sm text-neutral-100 hover:bg-neutral-800 ring-2 bg-neutral-800 focus:outline-none focus:ring-transparent focus:bg-neutral-800"
				/>
			) : (
				<p
					className={classNames("text-neutral-100 flex-1 break-words text-sm overflow-hidden h-full", todo.isCompleted ? "line-through" : "")}
					onClick={handleEdit}
				>
					{todo.text}
				</p>
			)}

			<div className="flex gap-3 items-center">
				<span className="text-neutral-500 text-sm pointer-events-none select-none">{formatDate(todo.createdAt)}</span>

				<button
					className="rounded-md bg-red-500/20 text-neutral-100 transition p-1 hover:bg-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-sm"
					onClick={() => todoFunctions.delete(todo.id)}
				>
					❌
				</button>
			</div>
		</div>
	)
}