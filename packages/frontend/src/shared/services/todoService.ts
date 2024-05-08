import { CreateTodoDto, Todo, UpdateTodoDto } from '~typings/todo';
import { HttpService } from './httpService';
import { ITodoService } from '~/interfaces/todoService.interface';
import { QueryParams } from '~typings/queryParams';

export class TodoService implements ITodoService {
	private httpService: HttpService;

	constructor(httpService: HttpService) {
		this.httpService = httpService;
	}

	getAllTodos(queryParams?: QueryParams): Promise<Todo[]> {
		return this.httpService.get(`${process.env.GET_ALL_TODOS}`, {
			params: queryParams,
		});
	}

	getTodoById(id: number): Promise<Todo | null> {
		return this.httpService.get(`${process.env.GET_TODO}/${id}`);
	}

	updateTodo(id: number, updateData: UpdateTodoDto): Promise<void> {
		const { title, description, status, isPublic } = updateData;

		return this.httpService.put(`${process.env.UPDATE_TODO}/${id}`, {
			title,
			description,
			status,
			isPublic,
		});
	}

	createTodo(todo: CreateTodoDto): Promise<Todo> {
		const { title, description, status, isPublic } = todo;

		return this.httpService.post(`${process.env.CREATE_TODO}`, {
			title,
			description,
			status,
			isPublic,
		});
	}

	deleteTodo(id: number): Promise<void> {
		return this.httpService.delete(`${process.env.DELETE_TODO}/${id}`);
	}
}
