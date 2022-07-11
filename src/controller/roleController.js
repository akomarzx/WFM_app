const roleServices = require('../services/roleServices');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreateRoleForm = async (req, res, next) => {
  res.status(200).render('./roleAndPermissionViews/roleViews/createRoleView');
};

const getUpdateRoleForm = async (req, res, next) => {
  res.locals.roles = await roleServices.getAllRoles();
  res.status(200).render('./roleAndPermissionViews/roleViews/updateRoleView');
};

const getDeleteRoleForm = async (req, res, next) => {
  res.locals.roles = await roleServices.getAllRoles();
  res.status(200).render('./roleAndPermissionViews/roleViews/deleteRoleView');
};

const createRole = asyncWrapper(async (req, res, next) => {
  const {newRole} = req.body;
  console.log(newRole);
  await roleServices.createRole(newRole);
  req.flash('success', 'Role Created Succesfully');
  res.status(200).redirect('back');
});

const updateRole = asyncWrapper(async (req, res, next) => {
  await roleServices.updateRole(req.body.uuid, req.body.updatedRole);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deleteRole = async (req, res, next) => {
  await roleServices.deleteRole(req.body.uuid);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
};
module.exports = {
  getCreateRoleForm,
  getUpdateRoleForm,
  getDeleteRoleForm,
  createRole,
  updateRole,
  deleteRole,
};
