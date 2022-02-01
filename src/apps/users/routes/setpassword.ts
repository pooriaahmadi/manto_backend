import { Response } from "express";
import { Request } from "../../../types/interfaces";
import AppRoute from "../../../classes/AppRoute";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
import { SetPasswordSchema } from "../../../validations/user";

export default new AppRoute({
	execute: async (request: Request, response: Response): Promise<any> => {
		await request.user.setPassword(request.body.password);
		await request.user.generateToken();
		return response.json({
			message: "please login again"
		});
	},
	method: "POST",
	customRoute: "password/",
	validations: [SetPasswordSchema],
	middlewares: [AuthorizationToken]
});
