import { Response } from "express";
import { Request } from "../../../types/interfaces";
import AppRoute from "../../../classes/AppRoute";
import { UpdateSchema } from "../../../validations/user";
import AuthorizationToken from "../../../middlewares/AuthorizationToken";
export default new AppRoute({
	execute: async (request: Request, response: Response): Promise<any> => {
		try {
			await request.user.updateByValues(request.body);
			return response.json({ ...request.user.toJSON(), ...request.body });
		} catch (error) {
			if (error.errno == 1062) {
				return response.status(409).json({
					message: error.sqlMessage,
				});
			}
			console.log(error);
		}
	},
	method: "PUT",
	customRoute: "",
	middlewares: [AuthorizationToken],
	validations: [UpdateSchema],
});
