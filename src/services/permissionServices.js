
const {Permission, sequelize} = require('../models');
const {Op} = require('sequelize');

const getPermissions = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const permissions = await Permission.findAll({
        where: {
          permissionName: {
            [Op.notIn]: ['CREATE_ROLE', 'ASSIGN_ROLE', 'CREATE_PERMISSION'],
          },
        },
        // rejectOnEmpty: true,
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
        benchmark: true,
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
    await sequelize.transaction(async (t) => {
      await Permission.create({
        permissionName: newPermission,
      });
    });
  } catch (error) {
    throw error;
  }
};

const updatePermission = async (uuid, updatedPermission) => {
  try {
    await sequelize.transaction(async (t) => {
      const permissionToBeUpdated = await Permission.findOne({
        where: {
          uuid: uuid,
        },
      });
      await permissionToBeUpdated.set({
        permissionName: updatedPermission,
      });
      await permissionToBeUpdated.save();
      return permissionToBeUpdated;
    });
  } catch (error) {
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
      });
    });
  } catch (error) {
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
