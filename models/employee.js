'use strict';
const { allow } = require('joi');
const {
  Model, UUIDV4
} = require('sequelize');
const { DataTypes } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true,
    },
    uuid :{
      type : DataTypes.UUID  ,
      defaultValue : DataTypes.UUIDV4
    },
    first_name:{
      type : DataTypes.STRING,
      allowNull : false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull : false
    },  
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull : false
    },
    sex: {
      type: DataTypes.CHAR(2),
      allowNull : false,
      validate : {
        isIn : [['m', 'f', 'x']]
      }
    },
    employed_date: {
      type : DataTypes.DATEONLY,
      defaultValue : DataTypes.NOW(),
      allowNull : false
    },
    employmnet_status: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : [['active' , 'inactive']]
      }
    } 
  }, {
    sequelize,
    modelName: 'employee_details',
  });
  return Employee;
};