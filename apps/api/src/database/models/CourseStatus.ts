import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Course } from "./Course";

enum CourseStatusName {
  PENDING = "pending",
  ACTIVE = "active",
  FINISHED = "finished",
  CANCELLED = "cancelled",
}

interface CourseStatusModel extends Model {
  id: number;
  name: CourseStatusName;
}

export const CourseStatus = sequelize.define<CourseStatusModel>(
  "CourseStatus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.ENUM("pending", "active", "finished", "cancelled"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  { timestamps: false }
);
