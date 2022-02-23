import Main from "../databases/Main";
import { CommentInputs } from "../types/interfaces";
import Team from "./Team";
import User from "./User";

class _Comment {
  id: number;
  mode: number;
  title?: string;
  content: string;
  author: User;
  user?: User;
  team?: Team;
  constructor({ id, mode, title, content, team, user, author }: CommentInputs) {
    this.id = id;
    this.mode = mode;
    this.title = title;
    this.content = content;
    this.author = author;
    this.user = user;
    this.team = team;
  }
  delete = async () => {
    await Main.createQuery(`DELETE FROM comments WHERE comments.id=${this.id}`);
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
      author: this.author.toJSON(),
      user: this.user?.toJSON(),
      team: this.team?.toJSON(),
    };
  };
}

export default _Comment;
