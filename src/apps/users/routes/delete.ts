import { Response } from "express";
import { Request } from "../../../types/interfaces";
import AppRoute from "../../../classes/AppRoute";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
export default new AppRoute({
	execute: async (request: Request, response: Response): Promise<any> => {
		await request.user.delete();
		response.json({
			message: `User with id ${request.user.id} deleted`,
		});
	},
	method: "DELETE",
	customRoute: "",
	middlewares: [AuthorizationToken],
});
