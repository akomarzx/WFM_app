'use strict';
var bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users' , [
      {
        email : 'admin@wfm.com',
        hash : bcrypt.hash('12345' , 10),
        emp_id : 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users' , [
      {
        email : 'admin@wfm.com',
      }
    ])
  }
};
