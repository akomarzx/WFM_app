const {Role, sequelize} = require('../models');
const {Op} = require('sequelize');

const getAllRoles = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const roles = await Role.findAll({
        where: {
          role_name: {[Op.ne]: 'SUPER_ADMIN'},
        },
        rejectOnEmpty: true,
        benchmark: true,
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
        role_name: newRole,
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
        role_name: updatedRole,
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
  getAllRoles,
  updateRole,
  deleteRole,
};
