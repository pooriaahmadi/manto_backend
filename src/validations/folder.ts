import Joi from "joi";

export const FolderSchema = Joi.object({
    parent_folder: Joi.number().min(0),
    name: Joi.string().max(191).required(),
    slug: Joi.string().max(191).regex(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$")).required(),
    mode: Joi.number().min(0).max(2).required(),
    password: Joi.string().min(1).max(191).optional()
});

export const FolderUpdateSchema = Joi.object({
    parent_folder: Joi.number().min(0),
    name: Joi.string().max(191),
    slug: Joi.string().max(191).regex(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$")),
    mode: Joi.number().min(0).max(2),
    password: Joi.string().min(1).max(191)
})

export const FolderRead = Joi.object({
    password: Joi.string().min(1).max(191)
});