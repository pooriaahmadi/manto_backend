import Joi from "joi";

export const CommentCreateSchema = Joi.object({
  title: Joi.string()
    .max(191)
    .optional(),
  content: Joi.string(),
  team: Joi.number(),
  user: Joi.number(),
}).xor("team", "user");
