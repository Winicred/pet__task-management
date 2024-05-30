import {useActionCreators, useStateSelector} from "@/stores/hooks.ts";
import {todoActions} from "@/stores/slices/todo.ts";

/**
 * Button to complete all todos.
 */
export const CompleteAllButton = () => {
	const todos = useStateSelector((state) => state.todos.list);
	const todoFunctions = useActionCreators(todoActions);

	const hasUncompleted = todos.filter((todo) => !todo.isCompleted).length > 0;

	return (
		<button className="text-neutral-100 bg-neutral-600 transition rounded-md w-1/2 select-none disabled:opacity-30 font-medium enabled:hover:bg-neutral-700 disabled:cursor-not-allowed" onClick={() => todoFunctions.completeAll()} disabled={todos.length === 0 || !hasUncompleted}>
			Complete All
		</button>
	)
}