import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { IMiddleware } from '../interfaces/middleware.interface';

export interface SchemaValidatorOptions {
	checkBody?: boolean;
}

export class SchemaValidator<T> implements IMiddleware {
	constructor(
		private schema: Joi.Schema,
		private options?: SchemaValidatorOptions,
	) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		let validationResult;
		if (this.options && this.options.checkBody && req.body) {
			validationResult = this.schema.validate(req.body as T);
		} else {
			validationResult = this.schema.validate(req.params as T);
		}

		if (validationResult.error) {
			const details = validationResult.error.details.map(
				(detail) => detail.message,
			);
			res.status(400).send({ message: 'Validation error', details });
		} else {
			next();
		}
	}
}
