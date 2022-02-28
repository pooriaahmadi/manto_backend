import Main from "../databases/Main";
import { AnswersCreateInputs } from "../types/interfaces";
import Answer from "./Answer";
import Category from "./Category";
import Match from "./Match";
import Property from "./Property";
import Team from "./Team";

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
  static getByMatch = async (id: number): Promise<Answer[]> => {
    const result = await Main.createQuery(
      `SELECT answers.id as answers_id, answers.content as answers_content, properties.id as properties_id, properties.title as properties_title, properties.type as properties_type, categories.id as categories_id, categories.title as categories_title, matches.id as matches_id, teams.id as teams_id, teams.name as teams_name, teams.description as teams_description, teams.avatar as teams_avatar FROM answers INNER JOIN properties on answers.property=properties.id INNER JOIN categories on properties.category=categories.id INNER JOIN matches on answers.match_id=matches.id INNER JOIN teams on matches.team=teams.id WHERE matches.id=${id}`
    );
    return result.map(
      (item: any) =>
        new Answer({
          content: item.answers_content,
          id: item.answers_id,
          match: new Match({
            id: item.matches_id,
            team: new Team({
              id: item.teams_id,
              name: item.teams_name,
              avatar: item.teams_avatar,
              description: item.teams_description,
            }),
          }),
          property: new Property({
            id: item.properties_id,
            title: item.properties_title,
            type: item.properties_type,
            category: new Category({
              id: item.categories_id,
              title: item.caeg,
            }),
          }),
        })
    );
  };
}
export default Answers;
