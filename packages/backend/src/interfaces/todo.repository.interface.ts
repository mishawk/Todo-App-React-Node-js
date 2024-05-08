import { FilterParams } from '../types/filterParams';
import { CreateTodoDto, TodoType, UpdateTodoDto } from '../types/todos.type';

export interface ITodoRepository {
	createTodo(todo: CreateTodoDto): Promise<TodoType>;
	getTodoById(id: number): Promise<TodoType | null>;
	deleteTodo(id: number): Promise<void>;
	getAllTodos(
		userId: number,
		filters: FilterParams,
		limit: number,
		offset: number,
	): Promise<TodoType[]>;
	updateTodo(id: number, updateData: UpdateTodoDto): Promise<void>;
}
