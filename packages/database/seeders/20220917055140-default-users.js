"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 9;
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Super",
          lastName: "Admin",
          email: "superadmin@lms.com",
          password: await bcrypt.hash("123456", saltRounds),
          roleId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
        {
          firstName: "Demo",
          lastName: "Student",
          email: "student@lms.com",
          password: await bcrypt.hash("123456", saltRounds),
          roleId: 2,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Privileges", null, {});
  },
};
