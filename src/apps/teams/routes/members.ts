import AppRoute from "../../../classes/AppRoute";
import { Response } from "express";
import { Request } from "express";
import Teams from "../../../classes/Teams";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.getById(parseInt(request.params.id));
  if (!team) return response.status(404).json({ message: "Team not found" });
  const teamMembers = (await team.getMembers()).map((item) => item.toJSON());
  return response.json({ ...team.toJSON(), members: teamMembers });
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: ":id/members",
});
