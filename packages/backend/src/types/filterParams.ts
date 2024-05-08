import { Status } from '@prisma/client';

export interface FilterParams {
	title?: string;
	description?: string | null;
	status?: Status;
	isPublic?: boolean;
}
