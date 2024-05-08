import { UserType, CreateUserDto, UpdateUserDto } from '../types/user.type';

export interface IUserRepository {
	getUserById(id: number): Promise<UserType | null>;
	createUser(user: CreateUserDto): Promise<UserType>;
	deleteUser(id: number): Promise<void>;
	getAllUsers(): Promise<UserType[]>;
	updateUser(id: number, updateData: UpdateUserDto): Promise<void>;
	getUserByEmail(email: string): Promise<UserType | null>;
	getUserByVerificationToken(
		verificationToken: string,
	): Promise<UserType | null>;
	verifyUser(id: number): Promise<void>;
	updateVerificationToken(
		id: number,
		newVerificationToken: string,
	): Promise<UserType | null>;
	changeUserPassword(email: string, newPassword: string): Promise<void>;
}
