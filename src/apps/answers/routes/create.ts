import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Scouter from "../../../middlewares/Scouter";
import Answers from "../../../classes/Answers";
import Matches from "../../../classes/Matches";
import Properties from "../../../classes/Properties";
import { AnswerUpdateSchema } from "../../../validations/answer";
const execute = async (request: Request, response: Response) => {
  const match_id = parseInt(request.params.id);
  const property_id = parseInt(request.params.propertyid);
  const match = await Matches.getById(match_id);
  const property = await Properties.getById(property_id);
  if (!match) return response.status(404).json({ message: "Match not found" });
  if (!property)
    return response.status(404).json({ message: "Property not found" });
  const answer = await Answers.create({
    content: request.body.content,
    match: match,
    property: property,
  });
  return response.json(answer.toJSON());
};

export default new AppRoute({
  execute: execute,
  method: "POST",
  customRoute: "match/:id/property/:propertyid",
  middlewares: [Scouter],
  validations: [AnswerUpdateSchema],
});
