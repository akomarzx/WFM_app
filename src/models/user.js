'use strict';
// const {Model} = require('@sequelize/core');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
  });
  return User;
};
