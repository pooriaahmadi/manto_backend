import { BaseInputs } from "../types/interfaces";
import mysql from "mysql";

class Base {
	databaseName: string | undefined;
	password: string;
	username: string;
	port: number;
	host: string;
	db?: mysql.Connection;

	constructor({
		host = "localhost",
		port = 3306,
		username = "root",
		password = "",
		databaseName,
	}: BaseInputs) {
		this.host = host;
		this.port = port;
		this.username = username;
		this.password = password;
		this.databaseName = databaseName;
		this.create();
	}

	create = (): Base => {
		this.db = mysql.createConnection({
			host: this.host,
			port: this.port,
			user: this.username,
			password: this.password,
			database: this.databaseName,
			charset: "utf8mb4",
		});
		return this;
	};
	turnOn = (): Promise<any> => {
		return new Promise((resolve, reject) => {
			this.db?.connect((err) => {
				return err ? reject(err) : resolve("");
			});
		});
	};
	turnOff = (): any => {
		return this.db?.destroy();
	};
	pause = (): any => {
		return this.db?.pause();
	};
	resume = (): any => {
		return this.db?.resume();
	};
}

class Database {
	base: Base;

	constructor({ base }: { base: Base }) {
		this.base = base;
	}

	createQuery = (sqlQuery: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			this.base.db?.query(sqlQuery, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	};
	resolveUpdateValues = ({
		values,
		table,
	}: {
		values: { [key: string]: any };
		table: string;
	}): string => {
		let updateQuery = `UPDATE ${table}
                           SET `;
		const keys = Object.keys(values);
		keys.forEach((item, index) => {
			if (typeof values[item] === "object") {
				values[item] = JSON.stringify(values[item]);
			}
			if (typeof values[item] === "string") {
				values[item] = values[item].replace(/'/g, "''");
			}
			updateQuery += `${table}.${item}='${values[item]}'`;
			if (index < keys.length - 1) {
				updateQuery += ",";
			}
		});
		return `${updateQuery}`;
	};
}

export { Base, Database };
