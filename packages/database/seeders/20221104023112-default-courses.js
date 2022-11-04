"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          name: "React",
          description: "Test",
          categoryId: 1,
          level: "Easy",
          rate: 4.5,
          courseStatusId: 1,
          enable: true,
          scheduleId: 1,
          ownerId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
