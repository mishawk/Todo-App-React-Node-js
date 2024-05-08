import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IMiddleware } from '../interfaces/middleware.interface';
import { UserService } from '../services/user.service';
import { IConfigService } from '../interfaces/config.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';

export class JwtAuthMiddleware implements IMiddleware {
	constructor(
		private configService: IConfigService,
		private userRepository: IUserRepository,
	) {}

	async execute(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email } = req.body;

		const userService = new UserService(
			this.configService,
			this.userRepository,
		);

		const user = await userService.getUserByEmail(email);

		if (user) {
			const payload = { id: user.id, email: user.email };
			const token = jwt.sign(
				payload,
				process.env.JWT_SECRET || this.configService.get('JWT_SECRET'),
				{
					expiresIn: '1h',
				},
			);

			res.locals.token = token;
			next();
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	}
}
