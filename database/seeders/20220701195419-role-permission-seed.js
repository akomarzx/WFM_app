'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RolePermission', [
      {
        role_id: 1,
        permission_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 1,
        permission_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        permission_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('RolePermission', {
      // eslint-disable-next-line camelcase
      role_id: {[Op.in]: [1, 2]},
    });
  },
};

