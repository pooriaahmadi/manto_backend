import { Request, Response } from "express";
import AppRoute from "../../../classes/AppRoute";
import Users from "../../../classes/Users";
import User from "../../../classes/User";
import log from "../../../utils/logger";
export default new AppRoute({
  execute: async (request: Request, response: Response): Promise<any> => {
    let user: User | undefined;
    if (
      RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      ).test(request.params.username)
    ) {
      user = await Users.getByToken(request.params.username);
    } else {
      user = await Users.getByUsername(request.params.username);
    }
    if (!user) {
      return response.status(404).json({
        message: "user not found",
      });
    }
    response.json(user.toJSON());
  },
  method: "GET",
  customRoute: ":username/",
});
