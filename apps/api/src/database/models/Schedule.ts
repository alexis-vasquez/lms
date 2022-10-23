import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { ScheduleWeekDay } from "./ScheduleWeekDay";

interface ScheduleModel extends Model {
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
Schedule.belongsTo(ScheduleWeekDay, {
  onDelete: "CASCADE",
  foreignKey: "scheduleWeekDaysId",
  targetKey: "id",
});
