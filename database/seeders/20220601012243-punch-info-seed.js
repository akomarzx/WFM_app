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
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('punch_infos', {
      punch_id: {[Op.in]: [7000, 7001]},
    });
  },
};
