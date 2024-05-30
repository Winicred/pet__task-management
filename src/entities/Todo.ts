/**
 * Todo entity.
 *
 * Represents a single todo item.
 */
export interface Todo {
	id: string;
	text: string;
	isCompleted: boolean;
	createdAt: number;
}