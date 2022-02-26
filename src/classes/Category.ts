import { CategoryInputs } from "../types/interfaces";
import Main from "../databases/Main";

class Category {
  id: number;
  title: string;
  constructor({ id, title }: CategoryInputs) {
    this.id = id;
    this.title = title;
  }
  delete = async () => {
    await Main.createQuery(`DELETE FROM categories WHERE ${this.id}`);
  };
  updateByValues = async (values: { [key: string]: any }) => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: values,
        table: "categories",
      })} WHERE ${this.id}`
    );
  };
  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
    };
  };
}

export default Category;
