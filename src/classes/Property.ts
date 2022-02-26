import Main from "../databases/Main";
import { PropertyInputs } from "../types/interfaces";
import Category from "./Category";

class Property {
  id: number;
  title: string;
  type: number;
  category: Category;
  constructor({ category, id, title, type }: PropertyInputs) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.type = type;
  }
  delete = async () => {
    await Main.createQuery(`DELETE FROM properties WHERE ${this.id}`);
  };
  updateByValues = async (values: { [key: string]: any }) => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: values,
        table: "properties",
      })} WHERE properties.id=${this.id}`
    );
  };
  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      category: this.category.toJSON(),
    };
  };
}

export default Property;
