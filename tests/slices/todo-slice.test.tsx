import {test, expect, describe, beforeEach} from 'vitest'
import {Todo} from "../../src/entities/Todo";
import {todoActions, todoReducer} from "../../src/stores/slices/todo";

let initialState: { list: Todo[] };

describe('todoReducer', () => {
	beforeEach(() => {
		initialState = {
			list: [
				{id: "1", text: 'First todo', isCompleted: false, createdAt: new Date(8.64e15).getTime()},
				{id: "2", text: 'Second todo', isCompleted: true, createdAt: new Date(8.64e15).getTime()},
			]
		}
	});

	test('should handle initial state', () => {
		expect(todoReducer(undefined, {type: 'unknown'})).toEqual({list: []});
	});

	test('should handle hydrate', () => {
		const actual = todoReducer(initialState, todoActions.hydrate([{
			id: '2',
			text: 'New Todo',
			isCompleted: false,
			createdAt: new Date().getTime()
		}]));
		expect(actual.list.length).toEqual(1);
		expect(actual.list[0].text).toEqual('New Todo');
	});

	test('should handle add', () => {
		const actual = todoReducer(initialState, todoActions.add({text: 'New Todo', isCompleted: false}));
		expect(actual.list.length).toEqual(3);
		expect(actual.list[2].text).toEqual('New Todo');
	});

	test('should handle toggle', () => {
		const actual = todoReducer(initialState, todoActions.toggle('1'));
		expect(actual.list[0].isCompleted).toEqual(true);
	});

	test('should handle delete', () => {
		const actual = todoReducer(initialState, todoActions.delete('1'));
		expect(actual.list.length).toEqual(1);
	});

	test('should handle deleteCompleted', () => {
		const state = {
			list: [
				{id: '1', text: 'Test Todo', isCompleted: true, createdAt: new Date().getTime()},
				{id: '2', text: 'Test Todo 2', isCompleted: false, createdAt: new Date().getTime()},
			],
		};
		const actual = todoReducer(state, todoActions.deleteCompleted());
		expect(actual.list.length).toEqual(1);
		expect(actual.list[0].isCompleted).toEqual(false);
	});

	test('should handle completeAll', () => {
		const state = {
			list: [
				{id: '1', text: 'Test Todo', isCompleted: false, createdAt: new Date().getTime()},
				{id: '2', text: 'Test Todo 2', isCompleted: false, createdAt: new Date().getTime()},
			],
		};
		const actual = todoReducer(state, todoActions.completeAll());
		expect(actual.list[0].isCompleted).toEqual(true);
		expect(actual.list[1].isCompleted).toEqual(true);
	});
});