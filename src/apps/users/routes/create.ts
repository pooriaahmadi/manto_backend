import { Request, Response } from "express";
import AppRoute from "../../../classes/AppRoute";
import Users from "../../../classes/Users";
import { userSchema } from "../../../validations/user";
export default new AppRoute({
	execute: async (request: Request, response: Response): Promise<any> => {
		try {
			const result = await Users.create({
				username: request.body.username,
				email: request.body.email,
				password: request.body.password,
				preferredName: request.body.preferredName
			});
			return response.json({
				...result.toJSON(),
				email: request.body.email,
			});
		} catch (error) {
			if (error.errno == 1062) {
				return response.status(409).json({
					message: error.sqlMessage,
				});
			}
		}
	},
	method: "POST",
	customRoute: "",
	validations: [userSchema],
});
