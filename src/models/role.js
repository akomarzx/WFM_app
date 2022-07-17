'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Permission, {through: 'RolePermission',
        foreignKey: 'roleId'});
      this.hasMany(models.Employee, {foreignKey: 'roleId'});
    }
    toJSON() {
      return {...this.get(),
        roleId: undefined,
        createdAt: undefined,
        updatedAt: undefined};
    }
  }
  Role.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('roleName', value.toUpperCase());
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
  });
  return Role;
};
