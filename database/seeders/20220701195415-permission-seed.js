'use strict';

const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [
      {
        permission_id: 1,
        permmision_name: 'CREATE_ROLE',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission_name: 'ASSIGN_ROLE',
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission_name: 'CREATE_PERMISSION',
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
      permission_id: {[Op.in]: [1, 2, 3]},
    });
  },
};

