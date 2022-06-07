'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('punch_infos', [
      {
        punch_id: 7000,
        emp_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        punch_id: 7001,
        emp_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('punch_infos', [
      {
        punch_id: 7000,
      },
      {
        punch_id: 7001,
      },
    ]);
  },
};
