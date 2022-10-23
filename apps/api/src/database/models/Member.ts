import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";

interface MemberModel extends Model {
  id: number;
  user: string;
  roll: string;
  courseID: number;
}

export const Member = sequelize.define<MemberModel>(
  "Member",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roll: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
