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
      // define association here
    }
  }
  Attendance.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time_in: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time_out: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Attendance',
      tableName : 'attendances'
    }
  );
  return Attendance;
};
