import Joi from "joi";
export const AnswerUpdateSchema = Joi.object({
  content: Joi.required(),
});
