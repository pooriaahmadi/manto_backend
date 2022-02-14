import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import { CommentCreateSchema } from "../../../validations/comment";
import Comments from "../../../classes/Comments";
import _Comment from "../../../classes/Comment";
import Teams from "../../../classes/Teams";
import Scouter from "../../../middlewares/Scouter";
import Users from "../../../classes/Users";

const execute = async (request: Request, response: Response) => {
  if (request.body.team) {
    const team = await Teams.getById(request.body.team);
    if (!team) return response.status(404).json({ message: "Team not found" });
    const comment: _Comment = await Comments.create({
      mode: request.body.mode,
      author: request.user,
      content: request.body.content,
      title: request.body.title,
      team: team,
    });
    return response.json(comment.toJSON());
  } else if (request.body.user) {
    const user = await Users.getById(request.body.user);
    if (!user) return response.status(404).json({ message: "User not found" });
    const comment: _Comment = await Comments.create({
      mode: request.body.mode,
      author: request.user,
      content: request.body.content,
      title: request.body.title,
      user: user,
    });
    return response.json(comment.toJSON());
  }
};

export default new AppRoute({
  execute: execute,
  method: "POST",
  customRoute: "",
  middlewares: [Scouter],
  validations: [CommentCreateSchema],
});
