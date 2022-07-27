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
        foreignKey: 'positionId',
      });
    }
    toJSON() {
      return {...this.get(),
        positionId: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        deletedAt: undefined};
    }
  }
  Position.init({
    positionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    positionName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('positionName', value.toUpperCase());
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
