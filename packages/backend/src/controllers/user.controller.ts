import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { IConfigService } from '../interfaces/config.service.interface';
import { ILogger } from '../interfaces/logger.interface';
import { IUserService } from '../interfaces/user.service.interface';
import { TYPES } from '../types/types';
import { BaseController } from './base.controller';
import { IUserController } from '../interfaces/user.controller.interface';
import { UserType } from '../types/user.type';
import nodemailer from 'nodemailer';
import { JwtAuthMiddleware } from '../middlewares/auth.middleware';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { JwtAuthentication } from '../middlewares/JwtAuthentication.middleware';
import bcrypt from 'bcrypt';
import { generatePassword } from '../utils/generatePassword';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/getAllUsers',
				method: 'get',
				func: this.getAllUsers,
				middlewares: [
					new JwtAuthentication(configService, userRepository),
				],
			},
			{
				path: '/register',
				method: 'post',
				func: this.registerUser,
				middlewares: [],
			},
			{
				path: '/verifyToken/:token',
				method: 'get',
				func: this.verifyToken,
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [
					new JwtAuthMiddleware(configService, userRepository),
				],
			},
			{
				path: '/deleteUser/:id',
				method: 'delete',
				func: this.deleteUser,
				middlewares: [],
			},
			{
				path: '/changePassword',
				method: 'post',
				func: this.changeUserPassword,
				middlewares: [],
			},
			{
				path: '/forgotPassword',
				method: 'post',
				func: this.forgotPassword,
				middlewares: [],
			},
			{
				path: '/updateUser/:id',
				method: 'put',
				func: this.updateUser,
				middlewares: [],
			},
			{
				path: '/getUser/:id',
				method: 'get',
				func: this.getUserById,
				middlewares: [],
			},
			{
				path: '/getUserByEmail/:email',
				method: 'get',
				func: this.getUserByEmail,
				middlewares: [],
			},
		]);
	}

	async forgotPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;

		try {
			const user = await this.userService.getUserByEmail(email);

			if (!user) {
				res.status(404).json({ message: 'User not found!' });
				return;
			}

			const newPassword = generatePassword();

			const transporter = nodemailer.createTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user:
						this.configService.get('EMAIL_USERNAME') ||
						process.env.EMAIL_USERNAME,
					pass:
						this.configService.get('EMAIL_PASSWORD') ||
						process.env.EMAIL_PASSWORD,
				},
			});

			const mailOptions = {
				from:
					this.configService.get('EMAIL_USERNAME') ||
					process.env.EMAIL_USERNAME,
				to: email,
				subject: 'New password update',
				html: `Here you got a new password, please do not forget it): 
          <p>${newPassword}</p>`,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});

			const hashedNewPassword = await bcrypt.hash(newPassword, 10);
			await this.userService.changeUserPassword(email, hashedNewPassword);

			res.status(200).json({ message: 'Password changed successfully' });
		} catch (error) {
			res.status(500).json({ message: 'An error occurred' });
		}
	}

	async changeUserPassword(req: Request, res: Response): Promise<void> {
		const { email, password, newPassword } = req.body;

		try {
			const user = await this.userService.getUserByEmail(email);

			if (!user) {
				res.status(404).json({ message: 'User not found!' });
				return;
			}

			const isPasswordValid = await bcrypt.compare(
				password,
				user.password,
			);
			if (!isPasswordValid) {
				res.status(401).json({ message: 'Password is wrong!' });
				return;
			}

			const hashedNewPassword = await bcrypt.hash(newPassword, 10);
			await this.userService.changeUserPassword(email, hashedNewPassword);

			res.status(200).json({ message: 'Password changed successfully' });
		} catch (error) {
			res.status(500).json({ message: 'An error occurred' });
		}
	}

	private sendVerificationEmail(
		userEmail: string,
		verificationToken: string,
	): void {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user:
					this.configService.get('EMAIL_USERNAME') ||
					process.env.EMAIL_USERNAME,
				pass:
					this.configService.get('EMAIL_PASSWORD') ||
					process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from:
				this.configService.get('EMAIL_USERNAME') ||
				process.env.EMAIL_USERNAME,
			to: userEmail,
			subject: 'Please verify your account',
			html: `Please click on the following link to verify your account: 
        <a href="http://localhost:4201/users/verifyToken/${verificationToken}">Verify Token!</a>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}

	async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		const user = await this.userService.getUserByEmail(email);
		if (!user) {
			res.status(401).json({ message: 'User was not found!' });
			return;
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.status(401).json({ message: 'Password is wrong!' });
			return;
		}

		if (!user.isVerified) {
			const verificationToken =
				await this.userService.updateVerificationToken(user.id);

			const userEmail = user.email;

			this.sendVerificationEmail(userEmail, verificationToken);

			res.status(401).json({
				message:
					'The user is not verified. A new verification token has been sent to your email.',
			});
			return;
		}

		res.status(200).json({ token: res.locals.token });
	}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		const todos: UserType[] = await this.userService.getAllUsers();

		res.status(200).json(todos);
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const todo = await this.userService.getUserById(parseInt(id));

		res.status(200).json(todo);
	}

	async verifyToken(req: Request, res: Response): Promise<void> {
		const { token } = req.params;

		const user = await this.userService.getUserByVerificationToken(token);
		if (!user) {
			res.status(400).json({
				message: 'Token was not provided',
			});
			return;
		}

		if (
			!user.verificationTokenExpiry ||
			user.verificationTokenExpiry < new Date()
		) {
			res.status(400).json({
				message: 'Token is out of date',
			});
			return;
		}

		if (user.isVerified) {
			res.status(400).json({
				message: 'User is already verified',
			});
			return;
		}

		await this.userService.verifyUser(user.id);

		res.status(200).json({ message: 'User is successfully verified!' });
	}

	async registerUser(req: Request, res: Response): Promise<void> {
		const { email, password, firstName, lastName } = req.body;

		const createdUser: UserType | null = await this.userService.createUser({
			email,
			password,
			firstName,
			lastName,
		});

		if (!createdUser) {
			res.status(400).json({
				message: 'User is not created',
			});
			return;
		}

		if (!createdUser.verificationToken) {
			res.status(400).json({
				message: 'Verification token is not generated',
			});
			return;
		}

		this.sendVerificationEmail(email, createdUser.verificationToken);

		res.status(201).json(createdUser);
	}

	async getUserByEmail(req: Request, res: Response): Promise<void> {
		const { email } = req.params;

		const todo = await this.userService.getUserByEmail(email);

		res.status(200).json(todo);
	}

	async deleteUser(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		await this.userService.deleteUser(parseInt(id));

		res.status(200).json({
			message: `User with id ${id} deleted successfully`,
		});
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const { email, password, firstName, lastName } = req.body;

		await this.userService.updateUser(parseInt(id), {
			email,
			password,
			firstName,
			lastName,
		});

		res.status(200).json({
			message: 'User  updated successfully',
		});
	}
}
