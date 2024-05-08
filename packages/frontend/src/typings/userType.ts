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
};

export type CreateUserDto = {
	email: string;
	firstName: string;
	lastName: string;
};

export type UpdateUserDto = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type UserDto = {
	id: number;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};
