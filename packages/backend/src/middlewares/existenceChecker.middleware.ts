import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/middleware.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaModels } from '../interfaces/prismaModels';

export class ExistenceChecker implements IMiddleware {
	model: keyof PrismaModels;
	constructor(model: keyof PrismaModels) {
		this.model = model;
	}

	async execute(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response<unknown, Record<string, unknown>> | undefined> {
		try {
			const prisma = new PrismaClient();
			const id = parseInt(req.params.id);

			const existingObject = await prisma[this.model].findUnique({
				where: { id },
			});

			if (!existingObject) {
				return res.status(404).json({ message: 'Object not found' });
			}

			next();
		} catch (error) {
			console.error('Error in isExist middleware:', error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}
}
