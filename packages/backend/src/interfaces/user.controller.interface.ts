import { Request, Response, NextFunction } from 'express';

export interface IUserController {
	getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
	getUserById(req: Request, res: Response): Promise<void>;
	registerUser(req: Request, res: Response): Promise<void>;
	deleteUser(req: Request, res: Response): Promise<void>;
	updateUser(req: Request, res: Response): Promise<void>;
	verifyToken(req: Request, res: Response): Promise<void>;
	getUserByEmail(req: Request, res: Response): Promise<void>;
	login(req: Request, res: Response): Promise<void>;
	forgotPassword(req: Request, res: Response): Promise<void>;
}
