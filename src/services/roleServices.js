const {Role, sequelize, Permission} = require('../models');
const {Op} = require('sequelize');

const getRoles = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const roles = await Role.findAll({
        benchmark: true,
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
        rejectOnEmpty: true,
        benchmark: true,
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
    await sequelize.transaction(async (t) => {
      await Role.create({
        roleName: newRole,
      });
    });
  } catch (error) {
    throw error;
  }
};

const updateRole = async (uuid, updatedRole) => {
  try {
    await sequelize.transaction(async (t) => {
      const roleToBeUpdated = await Role.findOne({
        where: {
          uuid: uuid,
        },
      });
      await roleToBeUpdated.set({
        roleName: updatedRole,
      });
      await roleToBeUpdated.save();
    });
  } catch (error) {
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
      });
    });
  } catch (error) {
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
