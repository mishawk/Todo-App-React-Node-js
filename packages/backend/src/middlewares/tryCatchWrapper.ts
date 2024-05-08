import { Request, Response } from 'express';
import { IMiddleware } from '../interfaces/middleware.interface';

type RequestHandler = (req: Request, res: Response) => void;

export class TryCatchWrapper implements IMiddleware {
	constructor(private fn: RequestHandler) {}

	async execute(req: Request, res: Response): Promise<void> {
		try {
			await this.fn(req, res);
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ message: 'Server error' });
		}
	}
}
