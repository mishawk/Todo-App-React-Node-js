import { Status } from '@prisma/client';

export type TodoType = {
	id: number;
	title: string;
	description: string | null;
	status: Status;
	isPublic: boolean;
	userId: number;
};

export type UpdateTodoDto = {
	title: string;
	description?: string;
	status: Status;
	isPublic: boolean;
};

export type CreateTodoDto = {
	title: string;
	description: string | null;
	status: Status;
	isPublic: boolean;
	userId: number;
};
