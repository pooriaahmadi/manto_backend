import chalk from "chalk";
import { logMethods } from "../types/enums";
const log = (content: string, type: logMethods = logMethods.INFO): void => {
	const date = new Date();
	const timestamp = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}]`;
	if (type === logMethods.INFO) {
		return console.log(`${timestamp} ${chalk.bgBlue("INFO")} ${content} `);
	} else if (type === logMethods.ERROR) {
		return console.log(`${timestamp} ${chalk.bgRed("ERROR")} ${content} `);
	} else if (type === logMethods.LOAD) {
		return console.log(`${timestamp} ${chalk.bgYellow("LOAD")} ${content} `);
	} else if (type === logMethods.DEBUG) {
		return console.log(`${timestamp} ${chalk.green("DEBUG")} ${content} `);
	} else if (type === logMethods.READY) {
		return console.log(
			`${timestamp} ${chalk.black.bgGreen("READY")} ${content}`
		);
	}
};

export default log;
