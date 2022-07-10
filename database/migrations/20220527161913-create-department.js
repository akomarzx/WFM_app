'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('departments', {
      dept_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dept_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    await queryInterface.dropTable('departments');
  },
};
