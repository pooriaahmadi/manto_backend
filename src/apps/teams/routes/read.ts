import AppRoute from "../../../classes/AppRoute";
import Teams from "../../../classes/Teams";
import { Request, Response } from "express";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.getById(parseInt(request.params.id));
  if (!team) return response.status(404).json({ message: "Team not found" });
  return response.json(team.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: ":id",
});
