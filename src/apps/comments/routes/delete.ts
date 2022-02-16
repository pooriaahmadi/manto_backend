import AppRoute from "../../../classes/AppRoute";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
import Comments from "../../../classes/Comments";
import _Comment from "../../../classes/Comment";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import TeamMember from "../../../classes/TeamMember";

const execute = async (request: Request, response: Response) => {
  const comment = await Comments.getById(parseInt(request.params.id));
  if (!comment)
    return response.status(404).json({ message: "Comment not found" });
  if (request.user.permissions & 16) {
    await comment.delete();
    return response.json({ message: "Comment deleted" });
  }
  if (comment.user) {
    if (comment.user.id === request.user.id) {
      await comment.delete();
      return response.json({ message: "Comment deleted" });
    }
  } else {
    if (!comment.team) return;
    const members = (await comment.team.getMembers()).filter(
      (item: TeamMember) =>
        item.permissions & 16 && item.user.id === request.user.id
    );
    if (members.length) {
      await comment.delete();
      return response.json({ message: "Comment deleted" });
    }
  }
  return response
    .status(403)
    .json({ message: "You don't have access to this comment" });
};

export default new AppRoute({
  execute: execute,
  method: "DELETE",
  customRoute: ":id",
  middlewares: [AuthorizationToken],
});
