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
    return queryInterface.bulkDelete('employees', null,
        {truncate: true, cascade: true});
  },
};
