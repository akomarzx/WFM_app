'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'roleId',
        },
        onDelete: 'CASCADE',
      },
      deptId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'departments',
          key: 'deptId',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      superId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'empId',
        },
        onDelete: 'CASCADE',
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'positions',
          key: 'positionId',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      sex: {
        // eslint-disable-next-line new-cap
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['MALE', 'FEMALE', 'X']],
        },
      },
      employmentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']],
        },
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      hiringDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
    await queryInterface.dropTable('employees');
  },
};
