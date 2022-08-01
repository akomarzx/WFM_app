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
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Position, {
        foreignKey: 'positionId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
          allowNull: true,
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
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['MALE', 'FEMALE', 'X']],
          },
          set(value) {
            this.setDataValue('sex', value.toUpperCase());
          },
        },
        employmentStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'ACTIVE',
          validate: {
            isIn: [['ACTIVE', 'INACTIVE']],
          },
          set(value) {
            this.setDataValue('employmentStatus', value.toUpperCase());
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
