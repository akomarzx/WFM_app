'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positions', [{
      position_id: 1000,
      position_name: 'IT ADMINISTRATOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      position_id: 1001,
      position_name: 'HUMAN RESOURCES GENERALIST',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('positions', {
      punch_id: {[Op.in]: [1000, 1001]},
    });
  },
};

