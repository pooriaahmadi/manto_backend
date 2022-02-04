import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
import { teamSchema } from "../../../validations/team";
import Teams from "../../../classes/Teams";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.create({
    name: request.body.name,
    user: request.user,
  });
  return response.json(team.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "POST",
  customRoute: "",
  middlewares: [AuthorizationToken],
  validations: [teamSchema],
});
