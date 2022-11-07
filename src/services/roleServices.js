const {Role, sequelize, Permission} = require('../models');
const {EmptyResultError} = require('sequelize');
const ApiError = require('../utils/apiError');

const getRoles = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const roles = await Role.findAll({
      });
      return roles;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const getRole = async (roleUuid) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const roles = await Role.findOne({
        where: {
          uuid: roleUuid,
        },
        include: Permission,
      });
      return roles;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const createRole = async (newRole) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.create({
        roleName: newRole,
      });
      return role;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateRole = async (uuid, updatedRole) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const roleToBeUpdated = await Role.findOne({
        where: {
          uuid: uuid,
        },
        rejectOnEmpty: true,
      });
      await roleToBeUpdated.set({
        roleName: updatedRole,
      });
      await roleToBeUpdated.save();
      return roleToBeUpdated;
    });
    return result;
  } catch (error) {
    if (error instanceof EmptyResultError) {
      throw new ApiError('Role not found', 400, false);
    }
    throw error;
  }
};

const deleteRole = async (uuid) => {
  try {
    sequelize.transaction(async (t) => {
      await Role.destroy({
        where: {
          uuid: uuid,
        },
        rejectOnEmpty: true,
      });
    });
  } catch (error) {
    if (error instanceof EmptyResultError) {
      throw new ApiError('Role not found', 400, false);
    }
    throw error;
  }
};

module.exports = {
  createRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};
