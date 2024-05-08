import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './interfaces/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types/types';
import { App } from './app';
import { IConfigService } from './interfaces/config.service.interface';
import { ConfigService } from './config/config.service';
import { ITodoController } from './interfaces/todo.controller.interface';
import { TodoController } from './controllers/todo.controller';
import { ITodoService } from './interfaces/todo.service.interface';
import { TodoService } from './services/todo.service';
import { ITodoRepository } from './interfaces/todo.repository.interface';
import { TodoRepository } from './repositories/todo.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { UserRepository } from './repositories/user.repository';
import { IUserService } from './interfaces/user.service.interface';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { IUserController } from './interfaces/user.controller.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<ITodoController>(TYPES.TodoController).to(TodoController);
	bind<ITodoService>(TYPES.TodoService).to(TodoService);
	bind<ITodoRepository>(TYPES.TodoRepository).to(TodoRepository);
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();
