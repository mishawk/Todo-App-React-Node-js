import { create } from 'zustand';
import { HttpService } from '~shared/services/httpService';
import { TodoService } from '~shared/services/todoService';
import { QueryParams } from '~typings/queryParams';
import { CreateTodoDto, Todo, UpdateTodoDto } from '~typings/todo';

interface ITodoStore {
	todos: Todo[];
	todo: Todo;
	createTodo(todo: CreateTodoDto): Promise<void>;
	getTodoById(id: number): Promise<void>;
	deleteTodo(id: number): Promise<void>;
	getAllTodos(queryParams?: QueryParams): Promise<Todo[]>;
	updateTodo(id: number, updateData: UpdateTodoDto): Promise<void>;
}

const todoService = new TodoService(
	new HttpService(`${process.env.SERVER_URL}/${process.env.BASE_ROUTE}`),
);

export const useTodoStore = create<ITodoStore>((set) => ({
	todos: [],
	todo: null,

	getAllTodos: async (queryParams?: QueryParams): Promise<Todo[]> => {
		const todos: Todo[] = await todoService.getAllTodos(queryParams);
		set({ todos });

		return todos;
	},

	getTodoById: async (id: number): Promise<void> => {
		const todo = await todoService.getTodoById(id);

		set({ todo });
	},

	updateTodo: async (
		id: number,
		updateData: UpdateTodoDto,
	): Promise<void> => {
		await todoService.updateTodo(id, updateData);

		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, ...updateData } : todo,
			),
		}));
	},

	createTodo: async (todo: CreateTodoDto): Promise<void> => {
		const newTodo = await todoService.createTodo(todo);

		set((state) => ({
			todos: [...state.todos, newTodo],
		}));
	},

	deleteTodo: async (id: number): Promise<void> => {
		await todoService.deleteTodo(id);

		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		}));
	},
}));
