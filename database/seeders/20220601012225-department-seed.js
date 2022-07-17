'use strict';

const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments', [
      {
        deptId: 1000,
        deptName: 'MANAGEMENT',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('departments', {
      deptId: {[Op.in]: [1000, 1001]},
    });
  },
};
