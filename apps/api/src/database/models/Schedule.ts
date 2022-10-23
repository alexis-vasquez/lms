import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Course } from "./Course";

interface ScheduleModel extends Model {
  id: number;
  initDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;
  weekDay: string;
  courseID: number;
}

export const Schedule = sequelize.define<ScheduleModel>(
  "Schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    initDate: {
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
    weekDay: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

/* Schedule.belongsTo */
