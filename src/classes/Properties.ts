import Main from "../databases/Main";
import { PropertiesCreateInputs } from "../types/interfaces";
import Category from "./Category";
import Property from "./Property";
class Properties {
  static create = async ({
    category,
    title,
    type,
  }: PropertiesCreateInputs): Promise<Property> => {
    const result = await Main.createQuery(
      `INSERT INTO categories (title, type, category) VALUES ('${title}', ${type}, ${category.id})`
    );
    return new Property({
      category: category,
      id: result.insertId,
      title: title,
      type: type,
    });
  };
  static getById = async (id: number): Promise<Property | undefined> => {
    let result: any = await Main.createQuery(
      `SELECT properties.id as properties_id, properties.title as properties_title, properties.type as properties_type, categories.id as categories_id, categories.title as categories_title FROM properties INNER JOIN category on properties.category=category.id WHERE properties.id=${id}`
    );
    if (!result.length) return;
    result = result[0];
    return new Property({
      id: result.properties_id,
      title: result.properties_title,
      type: result.properties_type,
      category: new Category({
        id: result.categories_id,
        title: result.categories_title,
      }),
    });
  };
}

export default Properties;
