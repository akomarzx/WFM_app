'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [
      {
        name: 'GET_EMPLOYEE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CREATE_EMPLOYEE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('permissions', {
      // eslint-disable-next-line camelcase
      id: {[Op.in]: [1, 2]},
    });
  },
};

