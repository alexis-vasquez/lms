import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";

export interface PrivilegeModel extends Model {
  id: number;
  name: string;
}

export const Privilege = sequelize.define<PrivilegeModel>(
  "Privilege",
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
  },
  {
    timestamps: false,
  }
);
