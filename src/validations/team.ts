import Joi from "joi";
export const teamSchema = Joi.object({
  name: Joi.string()
    .max(191)
    .required(),
  description: Joi.string(),
});
export const teamEditSchema = Joi.object({
  name: Joi.string().max(191),
  description: Joi.string(),
});
