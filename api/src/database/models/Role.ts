import { DataTypes } from 'sequelize';
import { sequelize } from '..';
import { Privilege } from './Privilege';

export const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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

Role.belongsToMany(Privilege, {
  through: 'RolePrivileges',
  timestamps: false,
});

Privilege.belongsToMany(Role, {
  through: 'RolePrivileges',
  timestamps: false,
});
