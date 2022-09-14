import { sequelize } from '@database';
import { DataTypes } from 'sequelize';

export const Privilege = sequelize.define('Privilege', {
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
}, {
  timestamps: false,
});