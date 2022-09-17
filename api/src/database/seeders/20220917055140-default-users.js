/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          firstName: 'Super',
          lastName: 'Admin',
          email: 'superadmin@lms.com',
          password: '123456',
          role: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
        {
          id: 2,
          firstName: 'Demo',
          lastName: 'Student',
          email: 'studen@lms.com',
          password: '123456',
          role: 2,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Privileges', null, {});
  },
};
