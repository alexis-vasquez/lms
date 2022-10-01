/* eslint-disable */
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 9;
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          firstName: 'Super',
          lastName: 'Admin',
          email: 'superadmin@lms.com',
          password: await bcrypt.hash("123456", saltRounds),
          role: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
        {
          id: 2,
          firstName: 'Demo',
          lastName: 'Student',
          email: 'student@lms.com',
          password: await bcrypt.hash("123456", saltRounds),
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
