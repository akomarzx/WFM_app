const roleServices = require('../services/roleServices');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreateRoleForm = asyncWrapper(async (req, res, next) => {
  res.status(200).render('./roleAndPermissionViews/roleViews/createRoleView');
});

const getUpdateRoleForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await roleServices.getRoles();
  res.status(200).render('./roleAndPermissionViews/roleViews/updateRoleView');
});

const getDeleteRoleForm = asyncWrapper(async (req, res, next) => {
  res.locals.roles = await roleServices.getRoles();
  res.status(200).render('./roleAndPermissionViews/roleViews/deleteRoleView');
});
const getRole = asyncWrapper(async (req, res, next) => {
  const role = await roleServices.getRole(req.params.id);
  res.status(200).json(role);
});
const getRoles = asyncWrapper(async (req, res, next) => {
  const roles = await roleServices.getRoles();
  res.status(200).json(roles);
});

const createRole = asyncWrapper(async (req, res, next) => {
  // eslint-disable-next-line camelcase
  const {role_name} = req.body;
  await roleServices.createRole(role_name);
  req.flash('success', 'Role Created Succesfully');
  res.status(200).redirect('back');
});

const updateRole = asyncWrapper(async (req, res, next) => {
  await roleServices.updateRole(req.body.uuid, req.body.role_name);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deleteRole = asyncWrapper(async (req, res, next) => {
  await roleServices.deleteRole(req.body.uuid);
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
