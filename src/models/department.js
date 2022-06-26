'use strict';
const {Model} = require('@sequelize/core');
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
        foreignKey: 'dept_id',
      });
    }
    toJSON() {
      return {...this.get(),
        dept_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined};
    }
  }
  Department.init({
    dept_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dept_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    paranoid: true,
  });
  Department.addHook('beforeCreate', (department, option)=> {
    department.dept_name = department.dept_name.toUpperCase();
  });

  return Department;
};
