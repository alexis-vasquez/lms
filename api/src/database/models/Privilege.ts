import { DataTypes, Model } from 'sequelize';
import { sequelize } from '..';

interface PrivilegeModel extends Model {
  id: number;
  name: string;
}

export const Privilege = sequelize.define<PrivilegeModel>(
  'Privilege',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
