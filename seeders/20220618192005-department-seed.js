'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments', [
      {
        dept_id: 1000,
        dept_name: 'MANAGEMENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'HUMAN RESOURCES',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('departments', {
      // eslint-disable-next-line camelcase
      dept_id: {[Op.in]: [1000, 1001]},
    });
  },
};
