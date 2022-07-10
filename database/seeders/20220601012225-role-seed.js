'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        role_id: 0,
        role_name: 'SUPER_ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('roles', {
      // eslint-disable-next-line camelcase
      role_id: {[Op.in]: [1, 2]},
    });
  },
};
