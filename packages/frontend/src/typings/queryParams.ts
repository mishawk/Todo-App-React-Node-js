import { Status } from './todo';

export type QueryParams = {
	title?: string;
	description?: string;
	status?: Status;
	isPublic?: boolean;
	limit?: number;
	offset?: number;
};
