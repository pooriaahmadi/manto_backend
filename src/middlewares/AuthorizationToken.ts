import { Response } from "express";
import { Request } from "../types/interfaces";
import Middleware from "../classes/Middleware";
import Users from "../classes/Users";

const AuthorizationToken = async (
	request: Request,
	response: Response
): Promise<any> => {
	if (request.headers && request.headers["authorization"]) {
		if (request.headers.authorization.startsWith("Bearer")) {
			const authorization = request.headers.authorization.replace(
				"Bearer ",
				""
			);
			const result = await Users.getByToken(authorization);

			if (result) {
				request.user = result;
			} else {
				return response.status(403).json({
					message: "Token is incorrect",
				});
			}
		} else {
			return response.status(403).json({
				message: "Token is missing",
			});
		}
	} else {
		return response.status(403).json({
			message: "Authorization token is missing.",
		});
	}
};

export default new Middleware({
	execute: AuthorizationToken,
});
