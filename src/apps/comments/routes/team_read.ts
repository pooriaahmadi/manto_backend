import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Teams from "../../../classes/Teams";
import Comments from "../../../classes/Comments";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.getById(parseInt(request.params.id));
  if (!team) return response.status(404).json("Team not found");
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
  customRoute: "/team/:id",
});
