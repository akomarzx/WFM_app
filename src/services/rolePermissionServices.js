/* eslint-disable camelcase */
const {Role, Permission, sequelize} = require('../models');

const createRolePermission = async (role_uuid, permission_uuid) => {
  try {
    await sequelize.transaction(async (t) => {
      const role = await Role.findOne(
          {where: {uuid: role_uuid},
            rejectOnEmpty: true});
      const permission = await Permission.findOne({
        where: {uuid: permission_uuid},
        rejectOnEmpty: true,
      });

      await role.addPermission(permission);
    });
  } catch (error) {
    throw error;
  }
};

const deleteRolePermission = async (role_uuid, permission_uuid) => {
  try {
    await sequelize.transaction(async (t) => {
      const role = await Role.findOne(
          {where: {uuid: role_uuid},
            rejectOnEmpty: true});
      const permission = await Permission.findOne({
        where: {uuid: permission_uuid},
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
