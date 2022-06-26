'use strict';
const {Model} = require('@sequelize/core');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.User, {
        foreignKey: 'emp_id',
        onDelete: 'CASCADE',
      });
      this.hasOne(models.PunchInfo, {
        foreignKey: 'emp_id',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Attendance, {
        foreignKey: 'emp_id',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Department, {
        // eslint-disable-next-line camelcase
        foreignKey: 'dept_id',
      });
      this.belongsTo(models.Position, {
        foreignKey: 'position_id',
      });
      this.hasMany(this, {as: 'children', foreignKey: 'emp_id'});
      this.belongsTo(this, {as: 'parent', foreignKey: 'emp_id'});
    }
    toJSON() {
      return {...this.get(),
        emp_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        dept_id: undefined,
        super_id: undefined,
        position_id: undefined};
    }
  }
  Employee.init(
      {
        dept_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        super_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        position_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birth_date: {
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
        employment_status: {
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
        hiring_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        emp_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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
