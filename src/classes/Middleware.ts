import { MiddlewareInputs } from "../types/interfaces";
import { Request, Response } from "express";
class Middleware {
	execute: any;
	constructor({ execute }: MiddlewareInputs) {
		this.execute = execute;
	}
	run = async ({
		request,
		response,
	}: {
		request: Request;
		response: Response;
	}) => {
		return await this.execute(request, response);
	};
}
export default Middleware;
