const {RoleServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getRole = asyncWrapper(async (req, res, next) => {
  const role = await RoleServices.getRole(req.params.id);
  res.status(200).json(role);
});

const getRoles = asyncWrapper(async (req, res, next) => {
  const roles = await RoleServices.getRoles();
  res.status(200).json(roles);
});

const createRole = asyncWrapper(async (req, res, next) => {
  const {roleName} = req.body;
  const role = await RoleServices.createRole(roleName);
  res.status(200).json(role);
});

const updateRole = asyncWrapper(async (req, res, next) => {
  const updated =
  await RoleServices.updateRole(req.params.id, req.body.roleName);
  res.status(200).json(updated);
});

const deleteRole = asyncWrapper(async (req, res, next) => {
  await RoleServices.deleteRole(req.params.id);
  res.status(200).json({message: 'Suceesfully Deleted'});
});

module.exports = {
  getRole,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
