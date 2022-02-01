import { Request, Response } from "express";
import AppRoute from "../../../classes/AppRoute";
import User from "../../../classes/User";
import Users from "../../../classes/Users";
import { LoginSchema } from "../../../validations/user";
import argon2 from "argon2";

export default new AppRoute({
	execute: async (request: Request, response: Response): Promise<any> => {
		let user: User | undefined;
		if (request.body.username) {
			user = await Users.getByUsername(request.body.username);
		} else {
			user = await Users.getByEmail(request.body.email);
		}
		if (user) {
			const isAccepted = await argon2.verify(user.hashedPassword, user.salt + request.body.password);
			if (isAccepted) {
				await user.setUpdatedAt();
				return response.json({
					...user.toJSON(),
					email: user.email,
					token: user.token,
				});
			}
			return response.status(403).json({
				message: "Password is incorrect.",
			});
		} else {
			return response.status(404).json({
				message: "user not found.",
			});
		}
	},
	method: "POST",
	validations: [LoginSchema],
});
