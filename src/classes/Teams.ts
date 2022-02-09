import { TeamCreateInputs } from "../types/interfaces";
import Main from "../databases/Main";
import Team from "./Team";
import Users from "./Users";
import User from "./User";

class Teams {
  static create = async ({ name, avatar, description }: TeamCreateInputs) => {
    const result: any = await Main.createQuery(
      `INSERT INTO teams(name, description, avatar) VALUES ('${name}', ${
        description ? `'${description}'` : "NULL"
      }, ${avatar ? `'${avatar}'` : "NULL"})`
    );

    return new Team({
      avatar: avatar,
      id: result.insertId,
      name: name,
      description: description,
    });
  };
  static all = async ({
    limit = undefined,
  }: {
    limit?: number;
  }): Promise<Team[]> => {
    let results: any = await Main.createQuery(
      "SELECT * FROM teams" + (limit ? `LIMIT=${limit}` : "")
    );
    return results.map((item: any) => {
      return new Team({
        id: item.id,
        name: item.name,
        description: item.description,
      });
    });
  };
  static getById = async (id: number) => {
    let result: any = await Main.createQuery(
      `SELECT * FROM teams WHERE teams.id=${id}`
    );
    if (result.length) {
      result = result[0];
      return new Team({
        id: result.id,
        name: result.name,
        description: result.description,
        avatar: result.avatar,
      });
    }
  };
}

export default Teams;
