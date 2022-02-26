import { method } from "./types";
import { Request as ExpressRequest } from "express";
import User from "../classes/User";
import { CommentModes, FolderModes } from "./enums";
import Team from "../classes/Team";
import Category from "../classes/Category";
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
export interface CommentInputs {
  id: number;
  mode: number;
  title?: string;
  content: string;
  author: User;
  user?: User;
  team?: Team;
}
export interface CommentsCreateInputs {
  mode: CommentModes;
  title?: string;
  content: string;
  author: User;
  team?: Team;
  user?: User;
}
export interface CategoryInputs {
  id: number;
  title: string;
}
export interface CategoriesCreateInputs {
  title: string;
}
export interface PropertyInputs {
  id: number;
  title: string;
  type: number;
  category: Category;
}
export interface PropertiesCreateInputs {
  title: string;
  type: number;
  category: Category;
}
export interface MatchInputs {
  id: number;
  team: Team;
}
