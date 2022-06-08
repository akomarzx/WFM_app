'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: 'emp_id',
      });
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
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time_in: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      time_out: {
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
    }
  );
  return Attendance;
};
