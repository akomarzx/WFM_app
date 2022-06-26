'use strict';
// const {Model} = require('@sequelize/core');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Employee, {
        foreignKey: 'position_id',
      });
    }
    toJSON() {
      return {...this.get(),
        position_id: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        deletedAt: undefined};
    }
  }
  Position.init({
    position_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    position_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Position',
    tableName: 'positions',
    paranoid: true,
  });
  return Position;
};
