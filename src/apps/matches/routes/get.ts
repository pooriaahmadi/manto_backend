import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Matches from "../../../classes/Matches";

const execute = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const match = await Matches.getById(id);
  if (!match) return response.status(404).json({ message: "Match not found" });
  return response.json(match.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: ":id",
});
