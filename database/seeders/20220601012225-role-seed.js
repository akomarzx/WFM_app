'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BASIC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('roles', {
      // eslint-disable-next-line camelcase
      id: {[Op.in]: [1, 2]},
    });
  },
};
