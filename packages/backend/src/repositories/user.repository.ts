import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { CreateUserDto, UpdateUserDto } from '../types/user.type';
import { UserType } from '../types/user.type';
import { IUserRepository } from '../interfaces/user.repository.interface';

@injectable()
export class UserRepository implements IUserRepository {
	prismaClient = new PrismaClient();

	async getUserById(id: number): Promise<UserType | null> {
		return await this.prismaClient.user.findUnique({
			where: { id },
		});
	}

	async changeUserPassword(
		email: string,
		newPassword: string,
	): Promise<void> {
		await this.prismaClient.user.update({
			where: { email: email },
			data: { password: newPassword },
		});
	}

	async getUserByVerificationToken(
		verificationToken: string,
	): Promise<UserType | null> {
		return await this.prismaClient.user.findUnique({
			where: { verificationToken },
		});
	}

	async updateVerificationToken(
		id: number,
		newVerificationToken: string,
	): Promise<UserType | null> {
		return await this.prismaClient.user.update({
			where: { id },
			data: {
				verificationToken: newVerificationToken,
			},
		});
	}

	async verifyUser(id: number): Promise<void> {
		await this.prismaClient.user.update({
			where: { id },
			data: {
				isVerified: true,
			},
		});
	}

	async getUserByEmail(email: string): Promise<UserType | null> {
		return await this.prismaClient.user.findUnique({
			where: { email },
		});
	}

	async createUser(user: CreateUserDto): Promise<UserType> {
		return await this.prismaClient.user.create({ data: user });
	}

	async deleteUser(id: number): Promise<void> {
		await this.prismaClient.user.delete({ where: { id } });
	}

	async getAllUsers(): Promise<UserType[]> {
		const users = await this.prismaClient.user.findMany();

		return users;
	}

	async updateUser(id: number, updateData: UpdateUserDto): Promise<void> {
		await this.prismaClient.user.update({
			where: { id },
			data: updateData,
		});
	}
}
