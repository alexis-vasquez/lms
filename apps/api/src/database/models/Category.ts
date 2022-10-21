import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";

interface CategoryModel extends Model {
  id: number;
  name: string;
  description: string;
}

export const Category = sequelize.define<CategoryModel>(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
