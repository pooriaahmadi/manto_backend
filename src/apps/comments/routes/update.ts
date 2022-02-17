import AppRoute from "../../../classes/AppRoute";
import { CommentUpdateSchema } from "../../../validations/comment";
import Scouter from "../../../middlewares/Scouter";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Comments from "../../../classes/Comments";

const execute = async (request: Request, response: Response) => {
  const comment = await Comments.getById(parseInt(request.params.id));
  if (!comment)
    return response.status(404).json({ message: "Comment not found" });
  comment.updateByValues(request.body);
  return response.json({
    ...comment.toJSON(),
    ...request.body,
  });
};
export default new AppRoute({
  execute: execute,
  method: "PUT",
  customRoute: ":id",
  middlewares: [Scouter],
  validations: [CommentUpdateSchema],
});
