import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
import { teamSchema } from "../../../validations/team";
import Teams from "../../../classes/Teams";
import TeamMembers from "../../../classes/TeamMembers";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.create({
    name: request.body.name,
    description: request.body.description,
  });
  const teamMember = await TeamMembers.create({
    team: team,
    user: request.user,
    permissions: 16,
  });
  return response.json(teamMember.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "POST",
  customRoute: "",
  middlewares: [AuthorizationToken],
  validations: [teamSchema],
});
