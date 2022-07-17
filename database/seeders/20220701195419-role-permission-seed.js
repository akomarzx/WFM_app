'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RolePermission', [
      {
        roleId: 1,
        permissionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        permissionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        permissionId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('RolePermission', {
      // eslint-disable-next-line camelcase
      roleId: {[Op.in]: [1, 2, 3]},
    });
  },
};

