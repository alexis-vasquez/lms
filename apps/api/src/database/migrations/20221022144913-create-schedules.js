"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ScheduleWeekDays", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      monday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tuesday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      wednesday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      thursday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      friday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      saturday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sunday: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
    await queryInterface.createTable("Schedules", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },

      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      scheduleWeekDaysId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "ScheduleWeekDays",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Schedules");
    await queryInterface.dropTable("ScheduleWeekDays");
  },
};
