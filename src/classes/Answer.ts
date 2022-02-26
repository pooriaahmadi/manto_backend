import Main from "../databases/Main";
import { AnswerInputs } from "../types/interfaces";
import Match from "./Match";
import Property from "./Property";

class Answer {
  id: number;
  content: string;
  property: Property;
  match: Match;
  constructor({ content, id, match, property }: AnswerInputs) {
    this.id = id;
    this.content = content;
    this.property = property;
    this.match = match;
  }
  delete = async () => {
    await Main.createQuery(`DELETE FROM answers WHERE ${this.id}`);
  };
  updateByValues = async (values: { [key: string]: any }) => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: values,
        table: "answers",
      })} WHERE ${this.id}`
    );
  };
  toJSON = () => {
    return {
      id: this.id,
      content: this.content,
      property: this.property.toJSON(),
      match: this.match.toJSON(),
    };
  };
}

export default Answer;
