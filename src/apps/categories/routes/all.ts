import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Categories from "../../../classes/Categories";

const execute = async (request: Request, response: Response) => {
  const categories = await Categories.all();
  return response.json(categories.map((item) => item.toJSON()));
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "all",
});
