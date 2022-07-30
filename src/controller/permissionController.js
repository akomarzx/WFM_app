
const {PermissionServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreatePermissionForm = asyncWrapper(async (req, res, next) => {
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/createPermissionView');
});

const getUpdatePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await PermissionServices.getPermissions();
  res.status(200).
      render('./roleAndPermissionViews/permissionViews/updatePermissionView');
});

const getDeletePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await PermissionServices.getPermissions();
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/deletePermissionView');
});

const getShowPermissionsPage = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await PermissionServices.getPermissions();
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/showPermissionsView');
});

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
  await PermissionServices.createPermission(permissionName);
  req.flash('success', 'Permission Created Succesfully');
  res.status(200).redirect('back');
});

const updatePermission = asyncWrapper(async (req, res, next) => {
  await PermissionServices.
      updatePermission(req.params.id, req.body.permissionName);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deletePermission = asyncWrapper(async (req, res, next) => {
  await PermissionServices.deletePermission(req.params.id);
  req.flash('success', 'Deleted Succesfully');
  res.redirect('back');
});

module.exports = {
  getCreatePermissionForm,
  getUpdatePermissionForm,
  getDeletePermissionForm,
  getShowPermissionsPage,
  getPermission,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};
