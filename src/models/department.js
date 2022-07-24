'use strict';
// const {Model} = require('@sequelize/core');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Employee, {
        // eslint-disable-next-line camelcase
        foreignKey: 'deptId',
      });
    }
    toJSON() {
      return {...this.get(),
        deptId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined};
    }
  }
  Department.init({
    deptId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    deptName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('deptName', value.toUpperCase());
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

  },
  {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    paranoid: true,
  });
  return Department;
};
