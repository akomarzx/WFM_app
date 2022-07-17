'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('punch_infos', {
      punchId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      empId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'empId',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('punch_infos');
  },
};
