import Main from "../databases/Main";
import { AnswersCreateInputs } from "../types/interfaces";
import Answer from "./Answer";

class Answers {
  static create = async ({
    content,
    match,
    property,
  }: AnswersCreateInputs): Promise<Answer> => {
    const result = await Main.createQuery(
      `INSERT INTO answers(content, match_id, property) VALUES ('${content}', ${match.id}, ${property.id})`
    );
    return new Answer({
      content: content,
      id: result.insertId,
      match: match,
      property: property,
    });
  };
}
export default Answers;
