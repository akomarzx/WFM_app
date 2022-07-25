const {RoleServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');
const getCreateRoleForm = asyncWrapper(async (req, res, next) => {
  res.status(200).render('./roleAndPermissionViews/roleViews/createRoleView');
});

const getUpdateRoleForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await RoleServices.getRoles();
  res.status(200).render('./roleAndPermissionViews/roleViews/updateRoleView');
});

const getDeleteRoleForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await RoleServices.getRoles();
  res.status(200).render('./roleAndPermissionViews/roleViews/deleteRoleView');
});
const getRole = asyncWrapper(async (req, res, next) => {
  const role = await RoleServices.getRole(req.params.id);
  res.status(200).json(role);
});
const getRoles = asyncWrapper(async (req, res, next) => {
  const roles = await RoleServices.getRoles();
  res.status(200).json(roles);
});

const createRole = asyncWrapper(async (req, res, next) => {
  // eslint-disable-next-line camelcase
  const {roleName} = req.body;
  await RoleServices.createRole(roleName);
  req.flash('success', 'Role Created Succesfully');
  res.status(200).redirect('back');
});

const updateRole = asyncWrapper(async (req, res, next) => {
  await RoleServices.updateRole(req.params.id, req.body.roleName);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deleteRole = asyncWrapper(async (req, res, next) => {
  await RoleServices.deleteRole(req.body.uuid);
  req.flash('success', 'Deleted Succesfully');
  res.redirect('back');
});

module.exports = {
  getCreateRoleForm,
  getUpdateRoleForm,
  getDeleteRoleForm,
  getRole,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
