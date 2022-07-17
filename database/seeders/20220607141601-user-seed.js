'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'admin@wfm.com',
        hash: await bcrypt.hash('12345', 10),
        empId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', [
      {
        email: 'admin@wfm.com',
      },
    ]);
  },
};
