import Main from "../databases/Main";
import { TeamMemberInputs } from "../types/interfaces";
import Team from "./Team";
import User from "./User";

class TeamMember {
  id: number;
  team: Team;
  user: User;
  permissions: number;
  constructor({ id, permissions, team, user }: TeamMemberInputs) {
    this.id = id;
    this.team = team;
    this.user = user;
    this.permissions = permissions;
  }
  delete = async (): Promise<void> => {
    await Main.createQuery(
      `DELETE FROM team_members WHERE team_members.id=${this.id}`
    );
  };
  updateByValues = async (values: { [key: string]: any }): Promise<void> => {
    await Main.createQuery(
      Main.resolveUpdateValues({
        values: values,
        table: "team_members",
      })
    );
  };
  makeOwner = async () => {};
  toJSON = () => {
    return {
      id: this.id,
      team: this.team.toJSON(),
      user: this.user.toJSON(),
      permissions: this.permissions,
    };
  };
}

export default TeamMember;
