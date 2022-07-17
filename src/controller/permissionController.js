
const {PermissionServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreatePermissionForm = asyncWrapper(async (req, res, next) => {
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/createPermissionView');
});

const getUpdatePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await PermissionServices.getAllPermission();
  res.status(200).
      render('./roleAndPermissionViews/permissionViews/updatePermissionView');
});

const getDeletePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await PermissionServices.getAllPermission();
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/deletePermissionView');
});

const createPermission = asyncWrapper(async (req, res, next) => {
  // eslint-disable-next-line camelcase
  const {permissionName} = req.body;
  await PermissionServices.createPermission(permissionName);
  req.flash('success', 'Permission Created Succesfully');
  res.status(200).redirect('back');
});

const updatePermission = asyncWrapper(async (req, res, next) => {
  await PermissionServices.
      updatePermission(req.body.uuid, req.body.permissionName);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deletePermission = asyncWrapper(async (req, res, next) => {
  await PermissionServices.deletePermission(req.body.uuid);
  req.flash('success', 'Deleted Succesfully');
  res.redirect('back');
});

module.exports = {
  getCreatePermissionForm,
  getUpdatePermissionForm,
  getDeletePermissionForm,
  createPermission,
  updatePermission,
  deletePermission,
};
