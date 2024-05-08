import Joi from 'joi';

export const todoIdSchema = Joi.object({
	id: Joi.number().required(),
});

export const todoCreateSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().allow(null),
	status: Joi.string().valid('completed', 'inProgress'),
	isPublic: Joi.boolean().required(),
});

export const todoUpdateSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string().allow(null),
	status: Joi.string().valid('completed', 'inProgress'),
	isPublic: Joi.boolean(),
});
