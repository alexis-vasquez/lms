import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Course } from "./Course";

export interface ScheduleModel extends Model {
  id: number;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
}

export const Schedule = sequelize.define<ScheduleModel>("Schedule", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  scheduleWeekDaysId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Schedule.hasMany(Course, {
  onDelete: "CASCADE",
  foreignKey: "scheduleId",
});
