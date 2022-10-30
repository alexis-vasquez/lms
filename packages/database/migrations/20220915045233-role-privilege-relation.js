"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RolePrivileges", {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        primaryKey: true,
      },
      privilegeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Privileges",
          key: "id",
        },
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RolePrivileges");
  },
};
