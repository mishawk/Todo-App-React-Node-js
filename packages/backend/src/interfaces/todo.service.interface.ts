import { FilterParams } from '../types/filterParams';
import { CreateTodoDto, TodoType, UpdateTodoDto } from '../types/todos.type';

export interface ITodoService {
	getAllTodos(
		userId: number,
		filterParams: FilterParams,
		limit: number,
		offset: number,
	): Promise<TodoType[]>;
	createTodo(todo: CreateTodoDto): Promise<TodoType | null>;
	deleteTodo(id: number): Promise<void>;
	getTodoById(id: number): Promise<TodoType | null>;
	updateTodo(id: number, todo: UpdateTodoDto): Promise<void>;
}
