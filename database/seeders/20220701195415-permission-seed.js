'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [
      {
        permission_id: 1,
        permmision_name: 'CREATE_ROLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ASSIGN_ROLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CREATE_PERMISSION',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('permissions', {
      // eslint-disable-next-line camelcase
      permission_id: {[Op.in]: [1, 2, 3]},
    });
  },
};

