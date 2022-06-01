'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('punch_infos', {
      punch_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      emp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull : false,
        references : {
          model: 'employees',
          key : 'emp_id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('punch_infos');
  },
};
