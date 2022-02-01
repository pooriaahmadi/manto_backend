import { method } from "./types";
import { Request as ExpressRequest } from "express";
import User from "../classes/User";
import { FolderModes } from "./enums";

export interface AppInputs {
	route?: string;
}
export interface AppRouteInputs {
	execute: any;
	middlewares?: Array<any>;
	validations?: Array<any>;
	customRoute?: string;
	method: method;
}
export interface BaseInputs {
	databaseName?: string;
	password?: string;
	username?: string;
	port?: number;
	host?: string;
}
export interface MiddlewareInputs {
	execute: any;
}

export interface UserInitialInputs {
	username: string;
	email: string;
	password: string;
	preferredName: string;
}
export interface UserInputs {
	id: number;
	username: string;
	email: string;
	permissions: number;
	salt: string;
	hashedPassword: string;
	token: string;
	verified: boolean;
	verificationToken?: string;
	preferredName?: string;
	createdAt: Date;
	updatedAt: Date;
}
export interface Request extends ExpressRequest {
	user: User;
}
