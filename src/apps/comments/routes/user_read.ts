import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Comments from "../../../classes/Comments";
import Users from "../../../classes/Users";

const execute = async (request: Request, response: Response) => {
  const user = await Users.getById(parseInt(request.params.id));
  if (!user) return response.status(404).json("Team not found");
  const comments = (await Comments.getByUser(user)).map((item) =>
    item.toJSON()
  );
  return response.json({
    user: user.toJSON(),
    comments: comments,
  });
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "users/:id",
});
