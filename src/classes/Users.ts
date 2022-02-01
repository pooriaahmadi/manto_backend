import Main from "../databases/Main";
import User from "./User";
import uuid4 from "uuid4";
import argon2 from "argon2";
import { UserInitialInputs } from "../types/interfaces";

class Users {
	static create = async ({
		email, password, preferredName, username
	}: UserInitialInputs): Promise<User> => {
		const salt = uuid4();
		const hashedPassword = await argon2.hash(salt + password);
		const token = uuid4();
		preferredName = preferredName ? `'${preferredName}'` : "NULL";
		const result: any = await Main.createQuery(
			`INSERT INTO users(username, email, salt, hashed_password, token, preferred_name) VALUES ('${username}','${email}','${salt}', '${hashedPassword}', '${token}', ${preferredName})`
		);
		return new User({
			id: result.insertId,
			email: email,
			username: username,
			createdAt: new Date(),
			updatedAt: new Date(),
			hashedPassword: hashedPassword,
			permissions: 0,
			token: token,
			verified: false,
			preferredName: preferredName==="NULL" ? undefined : preferredName,
			verificationToken: undefined,
			salt: salt
		});
	};
	static getById = async (id: number): Promise<User | undefined> => {
		let user: any = await Main.createQuery(`SELECT * FROM users WHERE ${id}`);
		if (user.length) {
			user = user[0];
			user = new User({
				email: user.email,
				id: user.id,
				permissions: user.permissions,
				username: user.username,
				token: user.token,
				hashedPassword: user.hashed_password,
				createdAt: new Date(user.created_at),
				updatedAt: new Date(user.updated_at),
				salt: user.salt,
				verified: user.verified,
				preferredName: user.preferred_name,
				verificationToken: user.verification_token
			});
			return user;
		}
	};
	static getByEmail = async (email: string): Promise<User | undefined> => {
		let user: any = await Main.createQuery(
			`SELECT * FROM users WHERE email='${email}'`
		);
		if (user.length) {
			user = user[0];
			user = new User({
				email: user.email,
				id: user.id,
				permissions: user.permissions,
				username: user.username,
				token: user.token,
				hashedPassword: user.hashed_password,
				createdAt: new Date(user.created_at),
				updatedAt: new Date(user.updated_at),
				salt: user.salt,
				verified: user.verified,
				preferredName: user.preferred_name,
				verificationToken: user.verification_token
			});
			return user;
		}
	};
	static getByUsername = async (
		username: string
	): Promise<User | undefined> => {
		let user: any = await Main.createQuery(
			`SELECT * FROM users WHERE username='${username}'`
		);
		if (user.length) {
			user = user[0];
			user = new User({
				email: user.email,
				id: user.id,
				permissions: user.permissions,
				username: user.username,
				token: user.token,
				hashedPassword: user.hashed_password,
				createdAt: new Date(user.created_at),
				updatedAt: new Date(user.updated_at),
				salt: user.salt,
				verified: user.verified,
				preferredName: user.preferred_name,
				verificationToken: user.verification_token
			});
			return user;
		}
	};
	static getByToken = async (token: string): Promise<User | undefined> => {
		let user: any = await Main.createQuery(
			`SELECT * FROM users WHERE token='${token}'`
		);
		if (user.length) {
			user = user[0];
			user = new User({
				email: user.email,
				id: user.id,
				permissions: user.permissions,
				username: user.username,
				token: user.token,
				hashedPassword: user.hashed_password,
				createdAt: new Date(user.created_at),
				updatedAt: new Date(user.updated_at),
				salt: user.salt,
				verified: user.verified,
				preferredName: user.preferred_name,
				verificationToken: user.verification_token
			});
			return user;
		}
	};
}
export default Users;
