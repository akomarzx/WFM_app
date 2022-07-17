'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {through: 'RolePermission',
        foreignKey: 'permissionId'});
    }
    toJSON() {
      return {...this.get(),
        permissionId: undefined,
        createdAt: undefined,
        updatedAt: undefined};
    }
  }
  Permission.init({
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    permissionName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('permissionName', value.toUpperCase());
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
  });
  return Permission;
};
