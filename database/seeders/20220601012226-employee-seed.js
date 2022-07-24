'use strict';
const moment = require('moment');
const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [
      {
        roleId: 1,
        deptId: 1000,
        positionId: 1000,
        firstName: 'Jim',
        lastName: 'Halpert',
        birthDate: moment('1992-04-07', ('YYYY-MM-DD')).toDate(),
        sex: 'm',
        employmentStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: uuidv4(),
        imagePath: '/img/jhalpert.jpg',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('employees', {
      empId: {[Op.in]: [1, 2]},
    });
  },
};
