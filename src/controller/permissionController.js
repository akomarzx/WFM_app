
const permissionServices = require('../services/permissionServices');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreatePermissionForm = asyncWrapper(async (req, res, next) => {
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/createPermissionView');
});

const getUpdatePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await permissionServices.getAllPermission();
  res.status(200).
      render('./roleAndPermissionViews/permissionViews/updatePermissionView');
});

const getDeletePermissionForm = asyncWrapper(async (req, res, next) => {
  res.locals.permissions = await permissionServices.getAllPermission();
  res.status(200)
      .render('./roleAndPermissionViews/permissionViews/deletePermissionView');
});

const createPermission = asyncWrapper(async (req, res, next) => {
  const {newPermission} = req.body;
  await permissionServices.createPermission(newPermission);
  req.flash('success', 'Permission Created Succesfully');
  res.status(200).redirect('back');
});

const updatePermission = asyncWrapper(async (req, res, next) => {
  await permissionServices.
      updatePermission(req.body.uuid, req.body.updatedPermission);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deletePermission = asyncWrapper(async (req, res, next) => {
  await permissionServices.deletePermission(req.body.uuid);
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
