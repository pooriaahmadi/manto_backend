import Main from "../databases/Main";
import Match from "./Match";
import Team from "./Team";

class Matches {
  static create = async (team: Team): Promise<Match> => {
    const result = await Main.createQuery(
      `INSERT INTO matches(team) values (${team.id})`
    );
    return new Match({
      id: result.insertId,
      team: team,
    });
  };
  static getById = async (id: number): Promise<Match | undefined> => {
    let result = await Main.createQuery(
      `SELECT *, matches.id as matches_id, teams.id as teams_id FROM matches INNER JOIN teams on matches.team=teams.id WHERE matches.id=${id}`
    );
    if (!result.length) return;
    result = result[0];
    return new Match({
      id: result.matches_id,
      team: new Team({
        id: result.teams_id,
        name: result.name,
        avatar: result.avatar,
        description: result.description,
      }),
    });
  };
  static getByTeam = async (id: number): Promise<Match[]> => {
    const results = await Main.createQuery(
      `SELECT *, matches.id as matches_id, teams.id as teams_id FROM matches INNER JOIN teams on matches.team=teams.id WHERE matches.team=${id}`
    );
    return results.map(
      (result: any) =>
        new Match({
          id: result.matches_id,
          team: new Team({
            id: result.teams_id,
            name: result.name,
            avatar: result.avatar,
            description: result.description,
          }),
        })
    );
  };
}

export default Matches;
