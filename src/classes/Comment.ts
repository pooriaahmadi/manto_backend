import Main from "../databases/Main";
import { CommentInputs } from "../types/interfaces";
import Team from "./Team";
import User from "./User";

class _Comment {
  id: number;
  mode: number;
  title?: string;
  content: string;
  user?: User;
  team?: Team;
  constructor({ id, mode, title, content, team, user }: CommentInputs) {
    this.id = id;
    this.mode = mode;
    this.title = title;
    this.content = content;
    this.user = user;
    this.team = team;
  }
  delete = async () => {
    await Main.createQuery(`DELETE FROM comments where ${this.id}`);
  };
  updateByValues = async (values: { [key: string]: any }) => {
    await Main.createQuery(
      Main.resolveUpdateValues({
        values: values,
        table: "comments",
      })
    );
  };
  toJSON = () => {
    return {
      id: this.id,
      mode: this.mode,
      title: this.title,
      content: this.content,
      user: this.user?.toJSON(),
      team: this.user?.toJSON(),
    };
  };
}

export default _Comment;
