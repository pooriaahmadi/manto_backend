import Joi from "joi";

export const CommentCreateSchema = Joi.object({
  title: Joi.string().max(191),
  content: Joi.string().required(),
  team: Joi.number(),
  user: Joi.number(),
  mode: Joi.number().required(),
}).xor("team", "user");
export const CommentUpdateSchema = Joi.object({
  title: Joi.string().max(191),
  content: Joi.string(),
  team: Joi.number(),
  user: Joi.number(),
  mode: Joi.number(),
});
