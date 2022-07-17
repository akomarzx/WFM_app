const {
  RolePermissionServices,
  RoleServices,
  PermissionServices} = require('../services');

const asyncWrapper = require('../utils/asyncWrapper');

const getCreateRolePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await RoleServices.getRoles();
  res.locals.permissions = await PermissionServices.getAllPermission();
  const viewPath =
  './roleAndPermissionViews/rolePermissionViews/createRolePermissionView';
  res.status(200).render(viewPath);
});

const getViewRolePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await RoleServices.getRoles();
  const viewPath =
  './roleAndPermissionViews/rolePermissionViews/viewRolePermissionView';

  res.status(200).render(viewPath);
});

const getDeleteRolePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await RoleServices.getRoles();
  const viewPath =
  './roleAndPermissionViews/rolePermissionViews/deleteRolePermissionView';

  res.status(200).render(viewPath);
});

const createRolePermission = asyncWrapper(async (req, res, next) => {
  // eslint-disable-next-line camelcase
  const {role_uuid, permission_uuid} = req.body;
  await RolePermissionServices.createRolePermission(role_uuid, permission_uuid);

  req.flash('success', 'Permission Assigned to Role succesfully');
  res.status(200).redirect('back');
});

const getRolePermissions = asyncWrapper(async (req, res, next) => {
  
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deleteRolePermission = asyncWrapper(async (req, res, next) => {
  const {role_uuid, permission_uuid} = req.body;
  await RolePermissionServices.deleteRolePermission(role_uuid, permission_uuid);

  req.flash('success', 'Permission Revoked Succesfully');
  res.redirect('back');
});

module.exports = {
  getCreateRolePermissionForm,
  getViewRolePermissionForm,
  getDeleteRolePermissionForm,
  createRolePermission,
  getRolePermissions,
  deleteRolePermission,
};
