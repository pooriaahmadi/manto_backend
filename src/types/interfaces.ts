import { method } from "./types";
import { Request as ExpressRequest } from "express";
import User from "../classes/User";
import { FolderModes } from "./enums";
import Team from "../classes/Team";

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
export interface TeamInputs {
  id: number;
  name: string;
  avatar?: string;
  description?: string;
}
export interface TeamCreateInputs {
  name: string;
  description?: string;
  avatar?: string;
}
export interface TeamMemberInputs {
  id: number;
  team: Team;
  user: User;
  permissions: number;
}

export interface TeamMembersCreate {
  team: Team;
  user: User;
  permissions: number;
}
