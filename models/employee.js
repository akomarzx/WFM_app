'use strict';
const PunchInfo = require('./punchinfo');
const { Model, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.PunchInfo, {
        foreignKey: 'emp_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Attendance, {
        foreignKey: 'emp_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Employee.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sex: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        validate: {
          isIn: [['m', 'f', 'x']],
        },
      },
      employment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['active', 'inactive']],
        },
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      hiring_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW(),
        allowNull: false,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'employees',
    }
  );
  return Employee;
};
