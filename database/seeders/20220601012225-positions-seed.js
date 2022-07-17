'use strict';

const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positions', [{
      positionId: 1000,
      positionName: 'IT ADMINISTRATOR',
      uuid: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('positions', {
      positionId: {[Op.in]: [1000, 1001]},
    });
  },
};

