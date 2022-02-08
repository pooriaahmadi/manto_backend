import { TeamInputs } from "../types/interfaces";
import User from "./User";
import Main from "../databases/Main";
import TeamMember from "./TeamMember";
class Team {
  id: number;
  name: string;
  avatar?: string;
  description?: string;
  constructor({ avatar, id, name, description }: TeamInputs) {
    this.id = id;
    this.name = name;
    this.description = description;
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
      description: this.description,
      avatar: this.avatar,
    };
  };
  getMembers = async (): Promise<TeamMember[]> => {
    const results = await Main.createQuery(
      `SELECT team_members.id as team_members_id, team_members.permissions as team_members_permissions, teams.id as teams_id, teams.name as teams_name, teams.avatar as teams_avatar, users.id as users_id, users.username as users_username, users.email as users_email, users.permissions as users_permissions, users.salt as users_salt, users.hashed_password as users_hashed_password, users.token as users_token, users.verified as users_verified, users.verification_token as users_verification_token, users.preferred_name as users_preferred_name, users.created_at as users_created_at, users.updated_at as users_updated_at FROM team_members INNER JOIN users on users.id=team_members.user INNER JOIN teams on teams.id=team_members.id WHERE team_members.team=${this.id};`
    );
    return results.map((item: any) => {
      return new TeamMember({
        id: item.team_members_id,
        permissions: item.team_members_permissions,
        team: new Team({
          id: item.teams_id,
          name: item.teams_name,
          avatar: item.teams_avatar,
          description: item.teams_description,
        }),
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
}

export default Team;
