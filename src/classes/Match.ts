import Main from "../databases/Main";
import { MatchInputs } from "../types/interfaces";
import Team from "./Team";

class Match {
  id: number;
  team: Team;
  constructor({ id, team }: MatchInputs) {
    this.id = id;
    this.team = team;
  }
  delete = async () => {
    await Main.createQuery(`DELETE FROM matches WHERE matches.id=${this.id}`);
  };
  updateByValues = async (values: { [key: string]: any }) => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: values,
        table: "matches",
      })} WHERE ${this.id}`
    );
  };
  toJSON = () => {
    return {
      id: this.id,
      team: this.team.toJSON(),
    };
  };
}

export default Match;
