import fs from "fs";
import path from "path";
import express, { Request, Response, Router } from "express";
import { AppInputs } from "../types/interfaces";
import AppRoute from "./AppRoute";

const removeExtension = (str: string): string => {
	return str.replace(".ts", "").replace(".js", "");
};

class App {
	route?: string;
	constructor({ route }: AppInputs) {
		this.route = route;
	}
	getRoutes = (name: string): { name: string; class: AppRoute }[] => {
		return fs
			.readdirSync(path.join(__dirname, "..", "apps", name, "routes"))
			.map((item) => {
				return {
					name: removeExtension(item),
					class: require(path.join(
						__dirname,
						"..",
						"apps",
						name,
						"routes",
						item
					)).default,
				};
			});
	};
	getRouter = (name: string): Router => {
		const router = express.Router();
		const appRoutes = this.getRoutes(name);
		router.get("", (request: Request, response: Response) => {
			return response.json(
				appRoutes.map((item, index) => {
					return {
						id: index,
						route: item.name || item.class.customRoute,
					};
				})
			);
		});
		return router;
	};
}

export default App;
