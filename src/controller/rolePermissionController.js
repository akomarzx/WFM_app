const {RolePermissionServices} = require('../services');

const asyncWrapper = require('../utils/asyncWrapper');

const createRolePermission = asyncWrapper(async (req, res, next) => {
  const {roleUuid, permissionUuid} = req.body;
  const rolePermission =
  await RolePermissionServices.createRolePermission(roleUuid, permissionUuid);
  res.status(200).json(rolePermission);
});

const deleteRolePermission = asyncWrapper(async (req, res, next) => {
  const {roleUuid, permissionUuid} = req.body;
  await RolePermissionServices.deleteRolePermission(roleUuid, permissionUuid);
  res.status(200).json({message: 'Permission Revoked Succesfully'});
});

module.exports = {
  createRolePermission,
  deleteRolePermission,
};
