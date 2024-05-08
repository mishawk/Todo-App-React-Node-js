export interface Todo {
	id: number;
	title: string;
	description: string | null;
	status: Status;
	isPublic: boolean;
}

export type UpdateTodoDto = {
	title?: string;
	description?: string;
	status?: Status;
	isPublic?: boolean;
};

export type CreateTodoDto = {
	title: string;
	description: string | null;
	status: Status;
	isPublic: boolean;
	userId: number;
};

export enum Status {
	completed = 'completed',
	inProgress = 'inProgress',
}
