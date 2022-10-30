/* eslint-disable */
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CourseStatuses",
      [
        {
          name: "pending",
        },
        {
          name: "active",
        },
        {
          name: "finished",
        },
        {
          name: "cancelled",
        }
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CourseStatuses", null, {});
  },
};

