import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Schedule } from "./Schedule";

interface ScheduleWeekDayModel extends Model {
  id: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export const ScheduleWeekDay = sequelize.define<ScheduleWeekDayModel>(
  "ScheduleWeekDay",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    monday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tuesday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wednesday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    thursday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    friday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    saturday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sunday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

ScheduleWeekDay.hasMany(Schedule, {
  onDelete: "CASCADE",
  foreignKey: "scheduleWeekDaysId",
});
