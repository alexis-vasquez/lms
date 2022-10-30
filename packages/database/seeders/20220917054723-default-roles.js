"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "superadmin",
      },
      {
        name: "student",
      },
    ]);
    await queryInterface.bulkInsert("RolePrivileges", [
      {
        roleId: 1,
        privilegeId: 1,
      },
      {
        roleId: 1,
        privilegeId: 2,
      },
      {
        roleId: 1,
        privilegeId: 3,
      },
      {
        roleId: 1,
        privilegeId: 4,
      },
      {
        roleId: 2,
        privilegeId: 5,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
