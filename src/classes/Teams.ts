import { TeamCreateInputs } from "../types/interfaces";
import Main from "../databases/Main";
import Team from "./Team";
import Users from "./Users";
import User from "./User";

class Teams {
  static create = async ({ name, user, avatar }: TeamCreateInputs) => {
    const result: any = Main.createQuery(
      `INSERT INTO teams(name, user, avatar) VALUES ('${name}',${user.id}, ${
        avatar ? `'${avatar}'` : "NULL"
      },'[value-4]')`
    );

    return new Team({
      avatar: avatar,
      id: result.insertId,
      name: name,
      user: user,
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
