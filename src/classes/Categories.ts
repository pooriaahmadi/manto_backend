import Main from "../databases/Main";
import { CategoriesCreateInputs } from "../types/interfaces";
import Category from "./Category";

class Categories {
  static create = async ({
    title,
  }: CategoriesCreateInputs): Promise<Category> => {
    const result = await Main.createQuery(
      `INSERT INTO categories (title) VALUES ('${title}')`
    );
    return new Category({
      id: result.insertId,
      title: title,
    });
  };
  static getById = async (id: number): Promise<Category | undefined> => {
    const results: { id: number; title: string }[] = await Main.createQuery(
      `SELECT * FROM categories WHERE categories.id=${id}`
    );
    if (!results.length) return;
    const data = results[0];
    return new Category({
      id: data.id,
      title: data.title,
    });
  };
}

export default Categories;
