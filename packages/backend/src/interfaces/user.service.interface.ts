import { UserType, CreateUserDto, UpdateUserDto } from '../types/user.type';

export interface IUserService {
	getUserById(id: number): Promise<UserType | null>;
	getAllUsers(): Promise<UserType[]>;
	createUser(createUser: CreateUserDto): Promise<UserType | null>;
	deleteUser(id: number): Promise<void>;
	updateUser(id: number, updateData: UpdateUserDto): Promise<void>;
	getUserByEmail(email: string): Promise<UserType | null>;
	getUserByVerificationToken(
		verificationToken: string,
	): Promise<UserType | null>;
	verifyUser(id: number): Promise<void>;
	createVerificationToken(): Promise<string>;
	updateVerificationToken(id: number): Promise<string>;
	changeUserPassword(email: string, newPassword: string): Promise<void>;
}
