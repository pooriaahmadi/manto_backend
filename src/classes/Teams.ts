import { TeamCreateInputs } from "../types/interfaces";
import Main from "../databases/Main";
import Team from "./Team";
import Users from "./Users";
import User from "./User";

class Teams {
  static create = async ({ name, user, avatar }: TeamCreateInputs) => {
    const result: any = await Main.createQuery(
      `INSERT INTO teams(name, user, avatar) VALUES ('${name}',${user.id}, ${
        avatar ? `'${avatar}'` : "NULL"
      })`
    );

    return new Team({
      avatar: avatar,
      id: result.insertId,
      name: name,
      user: user,
    });
  };
  static all = async ({
    limit = undefined,
  }: {
    limit?: number;
  }): Promise<Team[]> => {
    let results: any = await Main.createQuery(
      "SELECT *, teams.id as teams_id, teams.name as teams_name, teams.avatar as teams_avatar, users.id as users_id, users.username as users_username, users.email as users_email, users.permissions as users_permissions, users.salt as users_salt, users.hashed_password as users_hashed_password, users.token as users_token, users.verified as users_verified, users.verification_token as users_verification_token, users.preferred_name as users_preferred_name, users.created_at as users_created_at, users.updated_at as users_updated_at FROM teams INNER JOIN users on users.id=teams.user" +
        (limit ? `LIMIT=${limit}` : "")
    );
    return results.map((item: any) => {
      return new Team({
        id: item.teams_id,
        name: item.teams_name,
        user: new User({
          createdAt: item.users_created_at,
          email: item.teams_email,
          hashedPassword: item.users_hashed_password,
          id: item.users_id,
          permissions: item.users_permissions,
          salt: item.users_salt,
          token: item.users_token,
          updatedAt: item.users_updated_at,
          username: item.users_username,
          verified: item.users_verified,
          preferredName: item.users_preferred_name,
          verificationToken: item.users_verification_token,
        }),
      });
    });
  };
  static getById = async (id: number) => {
    let result: any = await Main.createQuery(
      `SELECT * FROM teams WHERE teams.id=${id}`
    );
    if (result.length) {
      result = result[0];
      const user = await Users.getById(result.user);
      return new Team({
        id: result.id,
        name: result.name,
        //@ts-ignore
        user: user,
        avatar: result.avatar,
      });
    }
  };
}

export default Teams;
