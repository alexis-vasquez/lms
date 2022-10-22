'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Status', { 
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    pending: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    finished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    cancelled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('Status');
  }
};
