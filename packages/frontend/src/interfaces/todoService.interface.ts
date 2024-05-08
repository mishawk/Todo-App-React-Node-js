import { CreateTodoDto, Todo, UpdateTodoDto } from '~typings/todo';

export interface ITodoService {
	getAllTodos(): Promise<Todo[]>;
	createTodo(todo: CreateTodoDto): Promise<Todo | null>;
	deleteTodo(id: number): Promise<void>;
	getTodoById(id: number): Promise<Todo | null>;
	updateTodo(id: number, todo: UpdateTodoDto): Promise<void>;
}
