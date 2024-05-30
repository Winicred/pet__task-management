import {useStateSelector} from "@/stores/hooks.ts";
import {TodoItem} from "@/components/todo/TodoItem.tsx";

/**
 * Component to display all todos.
 *
 * It sorts the todos by completion status and creation date.
 */
export const TodoItems = () => {
	const todos = useStateSelector((state) => state.todos.list);

	const sortedTodos = [...todos].sort((a, b) => {
		if (a.isCompleted === b.isCompleted) {

			// If the todos have the same completion status, sort them by creation date,
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}

		// Otherwise, sort them by completion status.
		return a.isCompleted ? 1 : -1;
	});

	if (sortedTodos.length === 0) return (
		<h2 className="text-neutral-500 text-center text-xl mt-5 h-1/2">No todos yet</h2>
	);

	return (
		<div className="flex flex-col mt-5 w-1/2 overflow-y-auto h-1/2 px-4">
			{sortedTodos.map((todo, index) => <TodoItem key={todo.id} todo={todo} isLastItem={index === sortedTodos.length - 1} />)}
		</div>
	)
}