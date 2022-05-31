'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement : true
      },
      //Foreign Key will be used to connect the punch information with the appropriate employee
      emp_id: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      time_in: {
        type: Sequelize.DATE,
        allowNull : false
      },
      time_out: {
        type: Sequelize.DATE,
        allowNull : true
      },
      remarks: {
        type: Sequelize.STRING,
        allowNull : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendances');
  }
};