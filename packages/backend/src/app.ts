import express, { Express } from 'express';
import { Server } from 'http';
import 'dotenv/config';
import { inject, injectable } from 'inversify';
import { ILogger } from './interfaces/logger.interface';
import { IConfigService } from './interfaces/config.service.interface';
import { TYPES } from './types/types';
import cors from 'cors';
import { ITodoService } from './interfaces/todo.service.interface';
import { TodoRepository } from './repositories/todo.repository';
import { TodoController } from './controllers/todo.controller';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import passport from 'passport';
import { IUserService } from './interfaces/user.service.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number | string | undefined;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.TodoService) private todoService: ITodoService,
		@inject(TYPES.TodoController) private todoController: TodoController,
		@inject(TYPES.TodoRepository) private todoRepository: TodoRepository,
		@inject(TYPES.UserRepository) private userRepository: UserRepository,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.UserController) private userController: UserController,
	) {
		this.app = express();
		this.port = this.configService.get('PORT') || process.env.PORT;
		this.configureMiddleware();
	}

	useCors(): void {
		this.app.use(
			cors({
				origin: '*',
				credentials: true,
			}),
		);
	}

	configureMiddleware(): void {
		this.app.use(passport.initialize());
		this.app.use(express.json());
		this.useCors();
		this.useRoutes();
	}

	useRoutes(): void {
		this.app.use('/todos', this.todoController.router);
		this.app.use('/users', this.userController.router);
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server is running on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
