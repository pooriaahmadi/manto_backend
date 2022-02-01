import { Request, Response } from "express";
import AppRoute from "../../../classes/AppRoute";
import Users from "../../../classes/Users";
export default new AppRoute({
	execute: async (request: Request, response: Response): Promise<any> => {
		const user = await Users.getByUsername(request.params.username);
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
