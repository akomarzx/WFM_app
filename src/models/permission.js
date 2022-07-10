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
        foreignKey: 'permission_id'});
    }
  }
  Permission.init({
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    permission_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('permission_name', value.toUpperCase());
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
