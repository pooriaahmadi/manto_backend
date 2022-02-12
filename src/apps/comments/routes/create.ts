import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
import { CommentCreateSchema } from "../../../validations/comment";

const execute = async (request: Request, response: Response) => {};

export default new AppRoute({
  execute: execute,
  method: "POST",
  customRoute: "",
  middlewares: [AuthorizationToken],
  validations: [CommentCreateSchema],
});
