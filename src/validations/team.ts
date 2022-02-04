import Joi from "joi";
export const teamSchema = Joi.object({
  name: Joi.string()
    .max(191)
    .required(),
});
