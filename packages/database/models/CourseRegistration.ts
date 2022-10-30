import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";

enum PositionName {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  TUTOR = "tutor",
}

interface CourseRegistrationModel extends Model {
  id: number;
  userId: number;
  position: PositionName;
  courseId: number;
}

export const CourseRegistration = sequelize.define<CourseRegistrationModel>(
  "CourseRegistration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.ENUM("student", "instructor", "tutor"),
      defaultValue: "student",
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  }
);
