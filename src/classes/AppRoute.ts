import express, { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import { AppRouteInputs } from "../types/interfaces";
import { method } from "../types/types";
import Middleware from "./Middleware";
class AppRoute {
	execute: any;
	method: method;
	middlewares: Array<any>;
	customRoute?: string;
	validations: Array<any>;
	constructor({
		execute,
		middlewares = [],
		validations = [],
		customRoute,
		method,
	}: AppRouteInputs) {
		this.execute = execute;
		this.method = method;
		this.middlewares = middlewares;
		this.customRoute = customRoute;
		this.validations = validations;
	}
	getRouter = (name: string) => {
		const Router = express.Router();
		const execute = async (
			request: express.Request,
			response: express.Response
		) => {
			for (let i = 0; i < this.middlewares.length; i++) {
				const middleware: Middleware = this.middlewares[i];
				const result = await middleware.run({
					request,
					response,
				});
				if (result) {
					return result;
				}
			}
			for (let i = 0; i < this.validations.length; i++) {
				if (
					request.body.constructor === Object &&
					Object.keys(request.body).length === 0
				) {
					return response.status(400).json({
						message: "Body is required",
					});
				}
				const validate: Joi.Schema = this.validations[i];
				try {
					await validate.validateAsync(request.body);
				} catch (error) {
					return response.status(400).json(error);
				}
			}
			await this.execute(request, response);
		};
		return this.resolveMethod({ router: Router, name: name, execute: execute });
	};
	resolveMethod = ({
		router,
		name,
		execute,
	}: {
		router: express.Router;
		name: string;
		execute: any;
	}): express.Router => {
		switch (this.method) {
			case "GET":
				router.get(name, execute);
				break;
			case "PUT":
				router.put(name, execute);
				break;
			case "DELETE":
				router.delete(name, execute);
				break;
			case "POST":
				router.post(name, execute);
				break;
			default:
				break;
		}
		return router;
	};
}
export default AppRoute;
