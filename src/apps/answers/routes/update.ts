import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Scouter from "../../../middlewares/Scouter";
import Answers from "../../../classes/Answers";
import { AnswerUpdateSchema } from "../../../validations/answer";
const execute = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const answer = await Answers.getById(id);
  if (!answer) return response.json({ message: "Answer not found" });
  answer.updateByValues(request.body);
  return response.json({
    ...answer.toJSON(),
    ...request.body,
  });
};

export default new AppRoute({
  execute: execute,
  method: "PUT",
  customRoute: ":id",
  middlewares: [Scouter],
  validations: [AnswerUpdateSchema],
});
