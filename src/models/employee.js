'use strict';
// const {Model} = require('@sequelize/core');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.User, {
        foreignKey: 'empId',
      });
      this.hasOne(models.PunchInfo, {
        foreignKey: 'empId',
      });
      this.hasMany(models.Attendance, {
        foreignKey: 'empId',
      });
      this.belongsTo(models.Department, {
        foreignKey: 'deptId',
      });
      this.belongsTo(models.Position, {
        foreignKey: 'positionId',
      });
      this.belongsTo(models.Role, {
        foreignKey: 'roleId',
      }),
      this.hasMany(this, {as: 'children', foreignKey: 'empId'});
      this.belongsTo(this, {as: 'parent', foreignKey: 'empId'});
    }
    toJSON() {
      return {...this.get(),
        empId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        deptId: undefined,
        superId: undefined,
        positionId: undefined};
    }
  }
  Employee.init(
      {
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        deptId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        superId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        positionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        sex: {
          // eslint-disable-next-line new-cap
          type: DataTypes.CHAR(2),
          allowNull: false,
          validate: {
            isIn: [['m', 'f', 'x']],
          },
        },
        employmentStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['active', 'inactive']],
          },
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        hiringDate: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        empId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        imagePath: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'employees',
        paranoid: true,
      },
  );
  return Employee;
};
