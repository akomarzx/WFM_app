'use strict';
const moment = require('moment');
const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [
      {
        role_id: 1,
        dept_id: 1000,
        position_id: 1000,
        first_name: 'Ronald',
        last_name: 'Ombao',
        birth_date: moment('1992-04-07', ('YYYY-MM-DD')).toDate(),
        sex: 'm',
        employment_status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: uuidv4(),
      },
      {
        role_id: 2,
        dept_id: 1001,
        super_id: 1,
        position_id: 1001,
        first_name: 'John',
        last_name: 'Smith',
        birth_date: moment('1997-03-06', ('YYYY-MM-DD')).toDate(),
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