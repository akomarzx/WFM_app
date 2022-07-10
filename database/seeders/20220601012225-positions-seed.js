'use strict';

const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positions', [{
      position_id: 1000,
      position_name: 'IT ADMINISTRATOR',
      uuid: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('positions', {
      position_id: {[Op.in]: [1000, 1001]},
    });
  },
};

