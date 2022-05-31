'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PunchInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee)
    }
  }
  PunchInfo.init(
    {
      punch_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'PunchInfo',
      tableName: 'punch_infos',
    }
  );
  return PunchInfo;
};
