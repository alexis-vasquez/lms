import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { CourseRegistration } from "./CourseRegistration";
import { User } from "./User";

export interface CourseModel extends Model {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  level: string;
  rate: number;
  courseStatusId: number;
  enable: boolean;
  scheduleId: number;
}

export const Course = sequelize.define<CourseModel>("Course", {
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
  categoryId: {
    type: DataTypes.INTEGER,
  },
  level: {
    type: DataTypes.STRING,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  courseStatusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  scheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Course, {
  onDelete: "SET DEFAULT",
  foreignKey: "ownerId",
});

Course.belongsTo(User, {
  foreignKey: "ownerId",
});

CourseRegistration.belongsTo(Course, {
  foreignKey: "courseId",
});

Course.hasMany(CourseRegistration, {
  onDelete: "CASCADE",
  foreignKey: "courseId",
});
