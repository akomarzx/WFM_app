'use strict';
// const {Model} = require('@sequelize/core');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: 'empId',
      });
    }
    toJSON() {
      return {...get(),
        id: undefined};
    }
  }
  Attendance.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        empId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        timeIn: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        timeOut: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        remarks: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Attendance',
        tableName: 'attendances',
        paranoid: true,
      },
  );
  return Attendance;
};
