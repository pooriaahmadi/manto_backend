import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Teams from "../../../classes/Teams";
import Comments from "../../../classes/Comments";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.getById(parseInt(request.params.id));
  if (!team) return response.status(404).json("Team not found");
  let members = await team.getMembers();
  members = members.filter(
    (item) => item.user.permissions & 16 && item.user.id === request.user.id
  );
  if (!members.length || !(request.user.permissions & 16))
    return response
      .status(403)
      .json({ message: "You don't have access to the comments" });

  const comments = (await Comments.getByTeam(team)).map((item) =>
    item.toJSON()
  );
  return response.json({
    team: team.toJSON(),
    comments: comments,
  });
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "teams/:id",
  middlewares: [AuthorizationToken],
});
