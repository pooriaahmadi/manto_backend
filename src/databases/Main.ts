import { Base, Database } from "../classes/Database";
import config from "../config";
const base = new Base(config.databaseConfig);
const Main = new Database({ base: base });
base
	.turnOn()
	.then(() => {
		Main.base = base;
	})
	.catch(() => {
		console.log("Cannot connect to database");
	});
export default Main;
