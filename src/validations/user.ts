import Joi from "joi";

export const userSchema = Joi.object({
	username: Joi.string()
		.required()
		.min(3)
		.max(191)
		.alphanum(),
	password: Joi.string().required().max(191),
	email: Joi.string()
		.email()
		.required().max(191),
	preferredName: Joi.string().max(191)
});

export const UpdateSchema = Joi.object({
	username: Joi.string()
		.min(3)
		.max(191)
		.alphanum(),
	email: Joi.string().email().max(191),
	preferred_name: Joi.string().max(191).allow(""),
});
export const LoginSchema = Joi.object({
	username: Joi.string()
		.min(3)
		.max(191)
		.alphanum(),
	password: Joi.string().required().max(191),
	email: Joi.string().email().max(191),
}).xor("username", "email");

export const SetPasswordSchema = Joi.object({
	password: Joi.string().required().max(191)
})