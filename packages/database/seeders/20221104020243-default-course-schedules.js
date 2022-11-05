"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ScheduleWeekDays",
      [
        {
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: false,
          sunday: false,
        },
      ],
      {}
    );
    await queryInterface.bulkInsert("Schedules", [
      {
        startDate: "2022-11-08",
        endDate: "2023-02-08",
        startTime: "20:00:00",
        endTime: "23:00:00",
        scheduleWeekDaysId: 1,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ScheduleWeekDays", null, {});
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};
