import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Scouter from "../../../middlewares/Scouter";
import Matches from "../../../classes/Matches";

const execute = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const match = await Matches.getById(id);
  if (!match) return response.status(404).json({ message: "Match not found" });
  await match.delete();
  return response.json({ message: "Match successfully deleted" });
};

export default new AppRoute({
  execute: execute,
  method: "DELETE",
  customRoute: ":id",
  middlewares: [Scouter],
});
