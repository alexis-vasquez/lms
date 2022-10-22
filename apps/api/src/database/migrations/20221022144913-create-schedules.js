'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },

      initDate: {
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

    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};
