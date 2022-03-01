import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Answers from "../../../classes/Answers";
import { AnswerUpdateSchema } from "../../../validations/answer";
const execute = async (request: Request, response: Response) => {
  const matchId = parseInt(request.params.id);
  const propertyId = parseInt(request.params.propertyid);
  const answer = await Answers.getByMatchAndProperty({
    matchId: matchId,
    propertyId: propertyId,
  });
  if (!answer)
    return response.status(404).json({ message: "Answer not found" });
  return response.json(answer.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "match/:id/property/:propertyid",
});
