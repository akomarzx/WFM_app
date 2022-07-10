'use strict';

const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments', [
      {
        dept_id: 1000,
        dept_name: 'MANAGEMENT',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('departments', {
      // eslint-disable-next-line camelcase
      dept_id: {[Op.in]: [1000, 1001]},
    });
  },
};
