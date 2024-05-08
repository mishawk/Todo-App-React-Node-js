import { inject, injectable } from 'inversify';
import { ITodoService } from '../interfaces/todo.service.interface';
import { TodoType, CreateTodoDto, UpdateTodoDto } from '../types/todos.type';
import { IConfigService } from '../interfaces/config.service.interface';
import { ITodoRepository } from '../interfaces/todo.repository.interface';
import { TYPES } from '../types/types';
import { Status } from '@prisma/client';
import { FilterParams } from '../types/filterParams';

@injectable()
export class TodoService implements ITodoService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.TodoRepository) private todoRepository: ITodoRepository,
	) {}

	async getTodoById(id: number): Promise<TodoType | null> {
		return await this.todoRepository.getTodoById(id);
	}

	async getAllTodos(
		userId: number,
		filterParams: FilterParams,
		limit: number,
		offset: number,
	): Promise<TodoType[]> {
		const todos = await this.todoRepository.getAllTodos(
			userId,
			filterParams,
			limit,
			offset,
		);

		return todos;
	}

	async createTodo(createTodo: CreateTodoDto): Promise<TodoType | null> {
		const { title, description, isPublic, status, userId } = createTodo;

		const todoData = {
			title,
			status: status || Status.inProgress,
			description,
			isPublic,
			userId,
		};

		const createdTodo: TodoType =
			await this.todoRepository.createTodo(todoData);

		return createdTodo;
	}

	async deleteTodo(id: number): Promise<void> {
		await this.todoRepository.deleteTodo(id);
	}

	async updateTodo(id: number, updateData: UpdateTodoDto): Promise<void> {
		await this.todoRepository.updateTodo(id, updateData);
	}
}
