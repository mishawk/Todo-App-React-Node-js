import { injectable } from 'inversify';
import { ITodoRepository } from '../interfaces/todo.repository.interface';
import { CreateTodoDto, TodoType, UpdateTodoDto } from '../types/todos.type';
import { PrismaClient } from '@prisma/client';
import { FilterParams } from '../types/filterParams';

@injectable()
export class TodoRepository implements ITodoRepository {
	prismaClient = new PrismaClient();

	async getTodoById(id: number): Promise<TodoType | null> {
		return await this.prismaClient.todo.findUnique({
			where: { id },
		});
	}

	async createTodo(todo: CreateTodoDto): Promise<TodoType> {
		return await this.prismaClient.todo.create({ data: todo });
	}

	async deleteTodo(id: number): Promise<void> {
		await this.prismaClient.todo.delete({ where: { id } });
	}

	async getAllTodos(
		userId: number,
		filters: FilterParams,
		limit: number,
		offset: number,
	): Promise<TodoType[]> {
		const todos = await this.prismaClient.todo.findMany({
			where: {
				userId,
				title: filters.title ? { contains: filters.title } : undefined,
				description: filters.description
					? { equals: filters.description }
					: undefined,
				status: filters.status ? { equals: filters.status } : undefined,
				isPublic:
					filters.isPublic !== undefined
						? { equals: filters.isPublic }
						: undefined,
			},
			skip: offset,
			take: limit,
		});

		return todos;
	}

	async updateTodo(id: number, updateData: UpdateTodoDto): Promise<void> {
		await this.prismaClient.todo.update({
			where: { id },
			data: updateData,
		});
	}
}
