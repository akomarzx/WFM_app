
const {PermissionServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getPermission = asyncWrapper(async (req, res, next) => {
  const permission = await PermissionServices.getPermission(req.params.id);
  res.status(200).json(permission);
});

const getPermissions = asyncWrapper(async (req, res, next) => {
  const permissions = await PermissionServices.getPermissions();
  res.status(200).json(permissions);
});

const createPermission = asyncWrapper(async (req, res, next) => {
  const {permissionName} = req.body;
  const permission =
  await PermissionServices.createPermission(permissionName);
  res.status(200).json(permission);
});

const updatePermission = asyncWrapper(async (req, res, next) => {
  const permission = await
  PermissionServices.updatePermission(req.params.id, req.body.permissionName);
  res.status(200).json(permission);
});

const deletePermission = asyncWrapper(async (req, res, next) => {
  await PermissionServices.deletePermission(req.params.id);
  res.status(200).json({message: 'Succesfully Deleted'});
});

module.exports = {
  getPermission,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};
