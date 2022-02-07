import AppRoute from "../../../classes/AppRoute";
import { Request, Response } from "express";
import Teams from "../../../classes/Teams";

const execute = async (request: Request, response: Response) => {
  const teams = await Teams.all({});
  return response.json(teams.map((item) => item.toJSON()));
};

export default new AppRoute({
  execute: execute,
  method: "GET",
});
