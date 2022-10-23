"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CourseRegistrations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      position: {
        type: Sequelize.ENUM("student", "instructor", "tutor"),
        defaultValue: "student",
        allowNull: false,
      },
      courseId: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: "CASCADE",
        references: {
          model: "Courses",
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
    await queryInterface.dropTable("CourseRegistrations");
  },
};
