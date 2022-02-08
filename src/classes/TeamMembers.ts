import Main from "../databases/Main";
import { TeamMembersCreate } from "../types/interfaces";
import Team from "./Team";
import TeamMember from "./TeamMember";
import User from "./User";

class TeamMembers {
  static create = async ({
    team,
    user,
    permissions,
  }: TeamMembersCreate): Promise<TeamMember> => {
    const result = await Main.createQuery(
      `INSERT INTO team_members(team, user, permissions) VALUES (${team.id}, ${user.id}, ${permissions})`
    );

    return new TeamMember({
      id: result.insertId,
      permissions: permissions,
      team: team,
      user: user,
    });
  };
  static getById = async (id: number): Promise<TeamMember | undefined> => {
    const results = await Main.createQuery(
      `SELECT team_members.id as team_members_id, team_members.permissions as team_members_permissions, teams.id as teams_id, teams.name as teams_name, teams.avatar as teams_avatar, users.id as users_id, users.username as users_username, users.email as users_email, users.permissions as users_permissions, users.salt as users_salt, users.hashed_password as users_hashed_password, users.token as users_token, users.verified as users_verified, users.verification_token as users_verification_token, users.preferred_name as users_preferred_name, users.created_at as users_created_at, users.updated_at as users_updated_at FROM team_members INNER JOIN users on users.id=team_members.user INNER JOIN teams on teams.id=team_members.id WHERE team_members.id=${id};`
    );
    if (results.length) {
      const item = results[0];
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
    }
  };
  static all = async (): Promise<TeamMember[]> => {
    const results = await Main.createQuery(
      `SELECT team_members.id as team_members_id, team_members.permissions as team_members_permissions, teams.id as teams_id, teams.name as teams_name, teams.avatar as teams_avatar, users.id as users_id, users.username as users_username, users.email as users_email, users.permissions as users_permissions, users.salt as users_salt, users.hashed_password as users_hashed_password, users.token as users_token, users.verified as users_verified, users.verification_token as users_verification_token, users.preferred_name as users_preferred_name, users.created_at as users_created_at, users.updated_at as users_updated_at FROM team_members INNER JOIN users on users.id=team_members.user INNER JOIN teams on teams.id=team_members.id;`
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

export default TeamMembers;
