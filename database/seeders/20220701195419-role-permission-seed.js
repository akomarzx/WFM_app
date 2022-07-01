'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rolePermissions', [
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
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('rolePermissions', {
      // eslint-disable-next-line camelcase
      id: {[Op.in]: [1, 2]},
    });
  },
};

