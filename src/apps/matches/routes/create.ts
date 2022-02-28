import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Scouter from "../../../middlewares/Scouter";
import Matches from "../../../classes/Matches";
import Teams from "../../../classes/Teams";

const execute = async (request: Request, response: Response) => {
  const teamId = parseInt(request.params.id);
  const team = await Teams.getById(teamId);
  if (!team) return response.status(404).json({ message: "Team not found" });
  const match = await Matches.create(team);
  return response.json(match.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "POST",
  customRoute: "team/:id",
  middlewares: [Scouter],
});
