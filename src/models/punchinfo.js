'use strict';
// const {Model} = require('@sequelize/core');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PunchInfo extends Model {
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
      return {...this.get(),
        empId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined};
    }
  }
  PunchInfo.init(
      {
        punchId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        empId: {
          type: DataTypes.INTEGER,
          unique: true,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'PunchInfo',
        tableName: 'punch_infos',
        paranoid: true,
      },
  );
  return PunchInfo;
};
