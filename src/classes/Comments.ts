import auth from "../apps/auth";
import Main from "../databases/Main";
import { CommentsCreateInputs } from "../types/interfaces";
import _Comment from "./Comment";
import Team from "./Team";
import User from "./User";

class Comments {
  static create = async ({
    mode,
    title,
    content,
    author,
    team,
    user,
  }: CommentsCreateInputs): Promise<_Comment> => {
    const results = await Main.createQuery(
      `INSER INTO comments(author, mode, title, content, team, user) VALUES (${
        author.id
      }, ${mode}, ${title ? `'${title}'` : "NULL"}, '${content}', ${
        team ? team.id : "NULL"
      }, ${user ? user.id : "NULL"})`
    );
    return new _Comment({
      id: results.insertId,
      author: author,
      mode: mode,
      title: title,
      content: content,
      team: team,
      user: user,
    });
  };
  getById = async (id: number): Promise<_Comment | undefined> => {
    let results = await Main.createQuery(
      `SELECT comments.id as comments_id, comments.mode as comments_mode, comments.title as comments_title, comments.content as comments_content, users.id as users_id, users.username as users_username, users.email as users_email, users.permissions as users_permissions, users.salt as users_salt, users.hashed_password as users_hashed_password, users.token as users_token, users.verified as users_verified, users.verification_token as users_verification_token, users.preferred_name as users_preferred_name, users.created_at as users_created_at, users.updated_at as users_updated_at,u2.id as author_id, u2.username as author_username, u2.email as author_email, u2.permissions as author_permissions, u2.salt as author_salt, u2.hashed_password as author_hashed_password, u2.token as author_token, u2.verified as author_verified, u2.verification_token as author_verification_token, u2.preferred_name as author_preferred_name, u2.created_at as author_created_at, u2.updated_at as author_updated_at, teams.id as teams_id, teams.name as teams_name, teams.avatar as teams_avatar FROM comments LEFT JOIN teams on teams.id=comments.team LEFT JOIN users on users.id=comments.user LEFT JOIN users u2 on u2.id=comments.author WHERE comments.id=${id};`
    );
    if (!results.length) return;
    results = results[0];
    return new _Comment({
      content: results.comments_content,
      id: results.comments_id,
      mode: results.comments_mode,
      title: results.comments_title,
      author: new User({
        createdAt: results.author_created_at,
        email: results.teams_email,
        hashedPassword: results.author_hashed_password,
        id: results.author_id,
        permissions: results.author_permissions,
        salt: results.author_salt,
        token: results.author_token,
        updatedAt: results.author_updated_at,
        username: results.author_username,
        verified: results.author_verified,
        preferredName: results.author_preferred_name,
        verificationToken: results.author_verification_token,
      }),
      team: new Team({
        avatar: results.teams_avatar,
        id: results.teams_id,
        name: results.teams_name,
        description: results.teams_description,
      }),
      user: new User({
        createdAt: results.users_created_at,
        email: results.teams_email,
        hashedPassword: results.users_hashed_password,
        id: results.users_id,
        permissions: results.users_permissions,
        salt: results.users_salt,
        token: results.users_token,
        updatedAt: results.users_updated_at,
        username: results.users_username,
        verified: results.users_verified,
        preferredName: results.users_preferred_name,
        verificationToken: results.users_verification_token,
      }),
    });
  };
  getByUser = async (id: number): Promise<_Comment[]> => {
    const results = await Main.createQuery(
      `SELECT comments.id as comments_id, comments.mode as comments_mode, comments.title as comments_title, comments.content as comments_content, users.id as users_id, users.username as users_username, users.email as users_email, users.permissions as users_permissions, users.salt as users_salt, users.hashed_password as users_hashed_password, users.token as users_token, users.verified as users_verified, users.verification_token as users_verification_token, users.preferred_name as users_preferred_name, users.created_at as users_created_at, users.updated_at as users_updated_at,u2.id as author_id, u2.username as author_username, u2.email as author_email, u2.permissions as author_permissions, u2.salt as author_salt, u2.hashed_password as author_hashed_password, u2.token as author_token, u2.verified as author_verified, u2.verification_token as author_verification_token, u2.preferred_name as author_preferred_name, u2.created_at as author_created_at, u2.updated_at as author_updated_at FROM comments LEFT JOIN users on users.id=comments.user LEFT JOIN users u2 on u2.id=comments.author WHERE comments.user=${id};`
    );
    return results.map((item: any) => {
      return new _Comment({
        content: results.comments_content,
        id: results.comments_id,
        mode: results.comments_mode,
        title: results.comments_title,
        author: new User({
          createdAt: results.author_created_at,
          email: results.teams_email,
          hashedPassword: results.author_hashed_password,
          id: results.author_id,
          permissions: results.author_permissions,
          salt: results.author_salt,
          token: results.author_token,
          updatedAt: results.author_updated_at,
          username: results.author_username,
          verified: results.author_verified,
          preferredName: results.author_preferred_name,
          verificationToken: results.author_verification_token,
        }),
        user: new User({
          createdAt: results.users_created_at,
          email: results.teams_email,
          hashedPassword: results.users_hashed_password,
          id: results.users_id,
          permissions: results.users_permissions,
          salt: results.users_salt,
          token: results.users_token,
          updatedAt: results.users_updated_at,
          username: results.users_username,
          verified: results.users_verified,
          preferredName: results.users_preferred_name,
          verificationToken: results.users_verification_token,
        }),
      });
    });
  };
  getByTeam = async (id: number): Promise<_Comment[]> => {
    const results = await Main.createQuery(
      `SELECT comments.id as comments_id, comments.mode as comments_mode, comments.title as comments_title, comments.content as comments_content, u2.id as author_id, u2.username as author_username, u2.email as author_email, u2.permissions as author_permissions, u2.salt as author_salt, u2.hashed_password as author_hashed_password, u2.token as author_token, u2.verified as author_verified, u2.verification_token as author_verification_token, u2.preferred_name as author_preferred_name, u2.created_at as author_created_at, u2.updated_at as author_updated_at, teams.id as teams_id, teams.name as teams_name, teams.avatar as teams_avatar FROM comments LEFT JOIN teams on teams.id=comments.team LEFT JOIN users u2 on u2.id=comments.author WHERE comments.team=${id};`
    );
    return results.map((item: any) => {
      return new _Comment({
        content: results.comments_content,
        id: results.comments_id,
        mode: results.comments_mode,
        title: results.comments_title,
        author: new User({
          createdAt: results.author_created_at,
          email: results.teams_email,
          hashedPassword: results.author_hashed_password,
          id: results.author_id,
          permissions: results.author_permissions,
          salt: results.author_salt,
          token: results.author_token,
          updatedAt: results.author_updated_at,
          username: results.author_username,
          verified: results.author_verified,
          preferredName: results.author_preferred_name,
          verificationToken: results.author_verification_token,
        }),
        team: new Team({
          avatar: results.teams_avatar,
          id: results.teams_id,
          name: results.teams_name,
          description: results.teams_description,
        }),
      });
    });
  };
}

export default Comments;
