import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Scouter from "../../../middlewares/Scouter";
import Answers from "../../../classes/Answers";
const execute = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const answers = await Answers.getByMatch(id);
  return response.json(answers.map((item) => item.toJSON()));
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "match/:id",
  middlewares: [Scouter],
});
