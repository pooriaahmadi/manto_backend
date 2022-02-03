import { TeamInputs } from "../types/interfaces";
import User from "./User";
import Main from "../databases/Main";
class Team {
  id: number;
  name: string;
  user: User;
  avatar?: string;
  constructor({ avatar, id, name, user }: TeamInputs) {
    this.id = id;
    this.name = name;
    this.user = user;
    this.avatar = avatar;
  }
  updateByValues = async (values: { [key: string]: any }): Promise<Team> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { ...values },
        table: "teams",
      })} WHERE id=${this.id}`
    );
    return this;
  };
  delete = async (): Promise<void> => {
    await Main.createQuery(`DELETE FROM teams WHERE id=${this.id}`);
  };
  toJSON = () => {
    return {
      id: this.id,
      name: this.name,
      user: this.user.toJSON(),
      avatar: this.avatar,
    };
  };
}

export default Team;
