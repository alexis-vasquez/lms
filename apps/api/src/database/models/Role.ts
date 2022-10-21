import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Privilege } from "./Privilege";

interface RoleModel extends Model {
  id: number;
  name: string;
}

export const Role = sequelize.define<RoleModel>(
  "Role",
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
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Role.belongsToMany(Privilege, {
  through: "RolePrivileges",
  timestamps: false,
});

Privilege.belongsToMany(Role, {
  through: "RolePrivileges",
  timestamps: false,
});
