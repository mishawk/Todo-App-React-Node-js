import { inject, injectable } from 'inversify';
import { IConfigService } from '../interfaces/config.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { TYPES } from '../types/types';
import { UserType } from '../types/user.type';
import { CreateUserDto, UpdateUserDto } from '../types/user.type';
import { IUserService } from '../interfaces/user.service.interface';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async getUserByVerificationToken(
		verificationToken: string,
	): Promise<UserType | null> {
		return await this.userRepository.getUserByVerificationToken(
			verificationToken,
		);
	}

	async changeUserPassword(
		email: string,
		newPassword: string,
	): Promise<void> {
		await this.userRepository.changeUserPassword(email, newPassword);
	}

	async verifyUser(id: number): Promise<void> {
		await this.userRepository.verifyUser(id);
	}

	async getUserById(id: number): Promise<UserType | null> {
		return await this.userRepository.getUserById(id);
	}

	async getUserByEmail(email: string): Promise<UserType | null> {
		return await this.userRepository.getUserByEmail(email);
	}

	async getAllUsers(): Promise<UserType[]> {
		const todos = await this.userRepository.getAllUsers();

		return todos;
	}

	async updateVerificationToken(id: number): Promise<string> {
		const verificationToken = await this.createVerificationToken();

		await this.userRepository.updateVerificationToken(
			id,
			verificationToken,
		);

		return verificationToken;
	}

	async createVerificationToken(): Promise<string> {
		return crypto.randomBytes(20).toString('hex');
	}

	async createUser(createUser: CreateUserDto): Promise<UserType | null> {
		const { email, password, firstName, lastName } = createUser;

		const hashedPassword = await bcrypt.hash(password, 10);

		const verificationToken = await this.createVerificationToken();

		const verificationTokenExpiry = new Date(Date.now() + 3600000);

		const userData = {
			email,
			password: hashedPassword,
			firstName,
			lastName,
			verificationToken,
			verificationTokenExpiry,
		};

		const createdUser: UserType =
			await this.userRepository.createUser(userData);

		return createdUser;
	}

	async deleteUser(id: number): Promise<void> {
		await this.userRepository.deleteUser(id);
	}

	async updateUser(id: number, updateData: UpdateUserDto): Promise<void> {
		await this.userRepository.updateUser(id, updateData);
	}
}
