import { Role, UserRole } from '@prisma/client';

export type UserType = {
	id: number;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	resetPasswordTokenExpiry?: Date | null;
	isVerified: boolean;
	verificationToken?: string | null;
	verificationTokenExpiry?: Date | null;
	roles?: Role[];
	UserRole?: UserRole[];
};

export type CreateUserDto = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	verificationToken?: string | null;
	verificationTokenExpiry?: Date | null;
};

export type UpdateUserDto = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};
