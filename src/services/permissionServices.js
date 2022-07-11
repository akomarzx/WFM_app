
const {Permission, sequelize} = require('../models');
const {Op} = require('sequelize');

const getAllPermission = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const permissions = await Permission.findAll({
        where: {
          permission_name: {
            [Op.notIn]: ['CREATE_ROLE', 'ASSIGN_ROLE', 'CREATE_PERMISSION'],
          },
        },
        rejectOnEmpty: true,
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
        permission_name: newPermission,
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
        permission_name: updatedPermission,
      });
      await permissionToBeUpdated.save();
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
  getAllPermission,
  updatePermission,
  deletePermission,
};
