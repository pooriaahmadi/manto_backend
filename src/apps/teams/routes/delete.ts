import AppRoute from "../../../classes/AppRoute";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Teams from "../../../classes/Teams";

const execute = async (request: Request, response: Response) => {
  const team = await Teams.getById(parseInt(request.params.id));
  if (!team) return response.status(404).json({ message: "Team not found" });
  if (team.user.id !== request.user.id)
    return response
      .status(403)
      .json({ message: "User does not have access to the team" });
  await team.delete();
  return response.json({ message: "Team deleted successfully" });
};

export default new AppRoute({
  execute: execute,
  method: "DELETE",
  customRoute: ":id",
  middlewares: [AuthorizationToken],
});
