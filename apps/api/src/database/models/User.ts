import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { CourseRegistration } from "./CourseRegistration";

export interface UserModel extends Model {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
  active: boolean;
}

export const User = sequelize.define<UserModel>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

CourseRegistration.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(CourseRegistration, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
