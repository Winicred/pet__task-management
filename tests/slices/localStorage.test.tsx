import {test, describe, expect, beforeAll} from "vitest";


export function getTodosFromLocalStorage() {
	const todos = localStorage.getItem('todos')
	return todos ? JSON.parse(todos) : []
}


const localStorageMock: Storage = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string): string => store[key] ?? null,
		setItem: (key: string, value: string): void => {
			store[key] = value.toString();
		},
		removeItem: (key: string): void => {
			delete store[key];
		},
		clear: (): void => {
			store = {};
		},
		key: (): string | null => "",
		length: Object.keys(store).length
	};
})();

describe('getTodosFromLocalStorage', () => {
	beforeAll((): void => {
		Object.defineProperty(global, 'localStorage', {
			value: localStorageMock
		});
	});

	test('should return todos from localStorage if they exist', () => {
		const todos = [{id: '1', text: 'Test Todo', isCompleted: false, createdAt: new Date().getTime()}]
		localStorage.setItem('todos', JSON.stringify(todos))

		expect(getTodosFromLocalStorage()).toEqual(todos)
	})

	test('should return an empty array if no todos exist in localStorage', () => {
		localStorage.removeItem('todos')
		expect(getTodosFromLocalStorage()).toEqual([])
	})
})