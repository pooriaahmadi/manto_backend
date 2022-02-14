import { Response } from "express";
import { Request } from "../types/interfaces";
import Middleware from "../classes/Middleware";
import AuthorizationToken from "./AuthorizationToken";
const Scouter = async (request: Request, response: Response): Promise<any> => {
  const result = await AuthorizationToken.execute(request, response);
  if (result) return result;
  if (!(request.user.permissions & 16))
    return response.status(403).json({ message: "You're not a scouter." });
};

export default new Middleware({
  execute: Scouter,
});
