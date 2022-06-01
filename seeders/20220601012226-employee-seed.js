'use strict';
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees' , [
      {
        first_name : "Ronald",
        last_name : 'Ombao',
        birth_date : moment('2000-01-01').format('YYYY/MM/DD'),
        sex : 'm',
        employment_status : 'active',
        createdAt: new Date(),
        updatedAt : new Date(),
        uuid : uuidv4()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('employees' , [{
     first_name : "Ronald"
   }])
  }
};
