'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_details', {
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      sex: {
        type: DataTypes.CHAR,
        allowNull: false
      },
      employed_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW(),
        allowNull: false
      },
       employmnet_status: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : [['active' , 'inactive']]
      }
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
    await queryInterface.dropTable('employee_details');
  }
};