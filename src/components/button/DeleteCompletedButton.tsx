import {useActionCreators, useStateSelector} from "@/stores/hooks.ts";
import {todoActions} from "@/stores/slices/todo.ts";

/**
 * Button to delete all completed todos.
 */
export const DeleteCompletedButton = () => {
	const todos = useStateSelector((state) => state.todos.list);
	const todoFunctions = useActionCreators(todoActions);

	const hasCompleted = todos.filter((todo) => todo.isCompleted).length > 0;

	return (
		<button className="p-2 bg-red-500 transition text-neutral-100 rounded-md w-1/2 select-none font-medium enabled:hover:bg-red-500/70 disabled:opacity-30" onClick={() => todoFunctions.deleteCompleted()} disabled={!hasCompleted}>
			Delete Completed
		</button>
	)
}