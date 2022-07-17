/* eslint-disable camelcase */
const {Role, Permission, sequelize} = require('../models');

const createRolePermission = async (roleUuid, permissionUuid) => {
  try {
    await sequelize.transaction(async (t) => {
      const role = await Role.findOne(
          {where: {uuid: roleUuid},
            rejectOnEmpty: true});
      const permission = await Permission.findOne({
        where: {uuid: permissionUuid},
        rejectOnEmpty: true,
      });

      await role.addPermission(permission);
    });
  } catch (error) {
    throw error;
  }
};

const deleteRolePermission = async (roleUuid, permissionUuid) => {
  try {
    await sequelize.transaction(async (t) => {
      const role = await Role.findOne(
          {where: {uuid: roleUuid},
            rejectOnEmpty: true});
      const permission = await Permission.findOne({
        where: {uuid: permissionUuid},
        rejectOnEmpty: true,
      });
      await role.removePermission(permission);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRolePermission,
  deleteRolePermission,
};
