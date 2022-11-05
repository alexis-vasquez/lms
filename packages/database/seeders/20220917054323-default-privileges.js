"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Privileges", [
      {
        name: "create_user",
      },
      {
        name: "enable_user",
      },
      {
        name: "disable_user",
      },
      {
        name: "create_course",
      },
      {
        name: "register_course",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Privileges", null, {});
  },
};
