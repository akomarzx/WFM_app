'use strict';
// Validate the Role names or make an enum inside the database
// with check constraint
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
        foreignKey: 'role_id'});
      this.hasMany(models.Employee, {foreignKey: 'role_id'});
    }
    toJSON() {
      return {...this.get(), role_id: undefined};
    }
  }
  Role.init({
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('role_name', value.toUpperCase());
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
