'use strict';

const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [
      {
        permissionId: 1,
        permissionName: 'CREATE_ROLE',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'ASSIGN_ROLE',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'CREATE_PERMISSION',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('permissions', {
      // eslint-disable-next-line camelcase
      permissionId: {[Op.in]: [1, 2, 3]},
    });
  },
};

