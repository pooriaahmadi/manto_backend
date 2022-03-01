import AppRoute from "../../../classes/AppRoute";
import { Request } from "../../../types/interfaces";
import { Response } from "express";
import Properties from "../../../classes/Properties";
const execute = async (request: Request, response: Response) => {
  const properties = await Properties.all();
  return response.json(properties.map((item) => item.toJSON()));
};

export default new AppRoute({
  execute: execute,
  method: "GET",
  customRoute: "all",
});
