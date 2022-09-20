import { DataTypes, Model } from 'sequelize';
import { sequelize } from '..';
import { Role } from './Role';

interface UserModel extends Model {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: number;
}

export const User = sequelize.define<UserModel>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
});

User.belongsTo(Role, {
  foreignKey: 'role',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
