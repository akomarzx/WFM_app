'use strict';
const moment = require('moment');
const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [
      {
        first_name: 'Ronald',
        last_name: 'Ombao',
        birth_date: moment('2000-01-01').format('YYYY/MM/DD'),
        sex: 'm',
        employment_status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: uuidv4(),
      },
      {
        first_name: 'John',
        last_name: 'Smith',
        birth_date: moment('1997-04-06').format('YYYY/MM/DD'),
        sex: 'm',
        employment_status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: uuidv4(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('employees', {
      emp_id: {[Op.in]: [1, 2]},
    });
  },
};
