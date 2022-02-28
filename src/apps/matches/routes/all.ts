import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Scouter from "../../../middlewares/Scouter";
import Matches from "../../../classes/Matches";

const execute = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const matches = await Matches.getByTeam(id);
  return response.json(matches.map((item) => item.toJSON()));
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "team/:id",
  middlewares: [Scouter],
});
