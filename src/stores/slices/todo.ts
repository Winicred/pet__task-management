import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "@/entities/Todo";

const initialState = {
	list: [] as Todo[]
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		hydrate: (state, action: PayloadAction<Todo[]>) => {
			state.list = action.payload;
		},
		add: (state, action: PayloadAction<{text: string; isCompleted: boolean }>) => {
			const newTodo = {
				id: Math.random().toString(36).substring(2, 9),
				text: action.payload.text,
				isCompleted: action.payload.isCompleted,
				createdAt: new Date().getTime(),
			};

			state.list.push(newTodo);
		},
		edit: (state, action: PayloadAction<{id: string; text: string}>) => {
			const todo = state.list.find((todo: Todo) => todo.id === action.payload.id);
			if (!todo) return;

			todo.text = action.payload.text;
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.list.find((todo: Todo) => todo.id === action.payload);
			if (!todo) return;

			todo.isCompleted = !todo.isCompleted;
		},
		delete: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter((todo: Todo) => todo.id !== action.payload);
		},
		deleteCompleted: (state) => {
			state.list = state.list.filter((todo: Todo) => !todo.isCompleted);
		},
		completeAll: (state) => {
			state.list.forEach((todo: Todo) => todo.isCompleted = true);
		}
	},
});

export const {reducer: todoReducer, actions: todoActions} = todoSlice;