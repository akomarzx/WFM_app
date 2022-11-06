
const {Permission, sequelize} = require('../models');
const {Op} = require('sequelize');
const {EmptyResultError} = require('sequelize');
const ApiError = require('../utils/apiError');
const getPermissions = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const permissions = await Permission.findAll({
        where: {
          permissionName: {
            [Op.notIn]: ['CREATE_ROLE', 'ASSIGN_ROLE', 'CREATE_PERMISSION'],
          },
        },
        benchmark: true,
      });
      return permissions;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const getPermission = async (uuid) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const permissions = await Permission.findOne({
        where: {
          uuid: uuid,
        },
      });
      return permissions;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const createPermission = async (newPermission) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const permission = await Permission.create({
        permissionName: newPermission,
      });
      return permission;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updatePermission = async (uuid, updatedPermission) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const permissionToBeUpdated = await Permission.findOne({
        where: {
          uuid: uuid,
        },
        rejectOnEmpty: true,
      });
      await permissionToBeUpdated.set({
        permissionName: updatedPermission,
      });
      await permissionToBeUpdated.save();
      return permissionToBeUpdated;
    });
    return result;
  } catch (error) {
    if (error instanceof EmptyResultError) {
      throw new ApiError('Permission not found', 400, false);
    }
    throw error;
  }
};

const deletePermission = async (uuid) => {
  try {
    sequelize.transaction(async (t) => {
      await Permission.destroy({
        where: {
          uuid: uuid,
        },
        rejectOnEmpty: true,
      });
    });
  } catch (error) {
    if (error instanceof EmptyResultError) {
      throw new ApiError('Permission not found', 400, false);
    }
    throw error;
  }
};

module.exports = {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
};
