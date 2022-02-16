import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Comments from "../../../classes/Comments";
import _Comment from "../../../classes/Comment";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";

const execute = async (request: Request, response: Response) => {
  const comment = await Comments.getById(parseInt(request.params.id));
  if (!comment)
    return response.status(404).json({ message: "Comment not found" });
  if (!(request.user.permissions & 16) && request.user.id !== comment.user?.id)
    return response
      .status(403)
      .json({ message: "You don't have access to this comment" });
  return response.json(comment.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: ":id",
  middlewares: [AuthorizationToken],
});
