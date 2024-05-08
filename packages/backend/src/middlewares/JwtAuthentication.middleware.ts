import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	VerifiedCallback,
} from 'passport-jwt';
import { UserType } from '../types/user.type';
import { UserService } from '../services/user.service';
import { IConfigService } from '../interfaces/config.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/middleware.interface';

export class JwtAuthentication implements IMiddleware {
	private jwtOptions: JwtOptions;
	private userService: UserService;
	private jwtStrategy: JwtStrategy;

	constructor(
		configService: IConfigService,
		userRepository: IUserRepository,
	) {
		this.jwtOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'MIsha' || configService.get('JWT_SECRET'),
		};
		this.userService = new UserService(configService, userRepository);
		this.jwtStrategy = new JwtStrategy(
			this.jwtOptions,
			this.verifyUser.bind(this),
		);
		passport.use(this.jwtStrategy);
	}

	private async verifyUser(
		jwtPayload: JwtPayload,
		done: VerifiedCallback,
	): Promise<void> {
		try {
			const user: UserType | null = await this.userService.getUserById(
				jwtPayload.id,
			);

			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (error) {
			return done(error, false);
		}
	}

	public execute(req: Request, res: Response, next: NextFunction): void {
		const authenticate = this.getAuthenticateJwtMiddleware();
		authenticate(req, res, next);
	}

	public getAuthenticateJwtMiddleware(): RequestHandler {
		return passport.authenticate('jwt', { session: false });
	}
}

interface JwtOptions {
	jwtFromRequest: (req: Request) => string | null;
	secretOrKey: string;
}

interface JwtPayload {
	id: number;
}
