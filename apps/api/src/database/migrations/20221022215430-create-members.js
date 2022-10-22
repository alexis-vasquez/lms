"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Members", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roll: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courseID: {
        type: Sequelize.INTEGER,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Members");
  },
};
