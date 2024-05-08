import 'reflect-metadata';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BaseController } from './base.controller';
import { inject, injectable } from 'inversify';
import { ITodoController } from '../interfaces/todo.controller.interface';
import { ILogger } from '../interfaces/logger.interface';
import { IConfigService } from '../interfaces/config.service.interface';
import { ITodoService } from '../interfaces/todo.service.interface';
import { TYPES } from '../types/types';
import { TodoType } from '../types/todos.type';
import { SchemaValidator } from '../middlewares/schemaValidator.middleware';
import {
	todoIdSchema,
	todoCreateSchema,
	todoUpdateSchema,
} from '../types/todo.schema';
import { ExistenceChecker } from '../middlewares/existenceChecker.middleware';
import { TryCatchWrapper } from '../middlewares/tryCatchWrapper';
import { JwtAuthentication } from '../middlewares/JwtAuthentication.middleware';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { FilterParams } from '../types/filterParams';
import { Status } from '@prisma/client';

@injectable()
export class TodoController extends BaseController implements ITodoController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.TodoService) private todoService: ITodoService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/getAllTodos',
				method: 'get',
				func: this.getAllTodos,
				middlewares: [
					new JwtAuthentication(configService, userRepository),
					new TryCatchWrapper(this.getAllTodos.bind(this)),
				],
			},
			{
				path: '/createTodo',
				method: 'post',
				func: this.createTodo,
				middlewares: [
					new JwtAuthentication(configService, userRepository),
					new SchemaValidator(todoCreateSchema, { checkBody: true }),
				],
			},
			{
				path: '/deleteTodo/:id',
				method: 'delete',
				func: this.deleteTodo,
				middlewares: [
					new SchemaValidator(todoIdSchema),
					new ExistenceChecker('todo'),
				],
			},
			{
				path: '/updateTodo/:id',
				method: 'put',
				func: this.updateTodo,
				middlewares: [
					new SchemaValidator(todoUpdateSchema, { checkBody: true }),
					new ExistenceChecker('todo'),
				],
			},
			{
				path: '/getTodo/:id',
				method: 'get',
				func: this.getTodoById,
				middlewares: [
					new SchemaValidator(todoIdSchema),
					new ExistenceChecker('todo'),
				],
			},
		]);
	}

	async getAllTodos(req: Request, res: Response): Promise<void> {
		const userId = this.getUserIdFromToken(req);
		const {
			title,
			description,
			status,
			isPublic,
			limit = '100',
			offset = '0',
		} = req.query;

		const filterParams: FilterParams = {
			title: typeof title === 'string' ? title : undefined,
			description:
				typeof description === 'string' ? description : undefined,
			status:
				typeof status === 'string' &&
				Object.values(Status).includes(status as Status)
					? (status as Status)
					: undefined,
			isPublic:
				typeof isPublic === 'string' ? isPublic === 'true' : undefined,
		};

		const todos: TodoType[] = await this.todoService.getAllTodos(
			userId,
			filterParams,
			Number(limit),
			Number(offset),
		);

		res.status(200).json(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const todo = await this.todoService.getTodoById(parseInt(id));

		res.status(200).json(todo);
	}

	private getUserIdFromToken(req: Request): number {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			throw new Error('Authorization token not provided');
		}

		const decodedToken = jwt.verify(
			token,
			this.configService.get('JWT_SECRET'),
		) as JwtPayload;

		if (!decodedToken.id) {
			throw new Error('Invalid token');
		}

		return decodedToken.id;
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const { title, description, status, isPublic } = req.body;
		const userId: number = this.getUserIdFromToken(req);

		const createdTodo: TodoType | null = await this.todoService.createTodo({
			title,
			description,
			status,
			isPublic,
			userId,
		});

		res.status(201).json(createdTodo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		await this.todoService.deleteTodo(parseInt(id));

		res.status(200).json({
			message: `Todo with id ${id} deleted successfully`,
		});
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const { title, description, status, isPublic } = req.body;

		await this.todoService.updateTodo(parseInt(id), {
			title,
			description,
			status,
			isPublic,
		});

		res.status(200).json({
			message: 'Todo  updated successfully',
		});
	}
}
