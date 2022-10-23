"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CourseStatuses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.ENUM("pending", "active", "finished", "cancelled"),
        defaultValue: "active",
        allowNull: false,
      },
    });
    await queryInterface.createTable("Courses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      level: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CourseStatuses",
          key: "id",
        },
      },
      enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Schedules",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Courses");
    await queryInterface.dropTable("CourseStatuses");
  },
};
