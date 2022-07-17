'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('punch_infos', [
      {
        punchId: 7000,
        empId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('punch_infos', {
      punchId: {[Op.in]: [7000, 7001]},
    });
  },
};
