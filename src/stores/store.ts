import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "@/stores/slices/todo.ts";
import {Todo} from "@/entities/Todo.ts";

/**
 * Redux store.
 */
export const store = configureStore({
	reducer: {
		todos: todoReducer,
		// Add more reducers here...
	}
});

/**
 * Function to save the state to local storage.
 * @param state - The Redux store state to save.
 */
function saveState(state: Todo[]) {
	localStorage.setItem("todos", JSON.stringify(state));
}

// Listen for changes to the store and save the state to local storage.
store.subscribe(() => {
	saveState(store.getState().todos.list);
});
