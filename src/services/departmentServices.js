const {sequelize, Department} = require('../models');

const getDepartment = async (deptUuid) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const department = await Department.findOne({
        where: {
          uuid: deptUuid,
        },
        benchmark: true,
      });
      return department;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const getDepartments = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const departments = Department.findAll();
      return departments;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const createDepartment = async (departmentName) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const department = await Department.create({
        deptName: departmentName,
      });
      return department;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateDepartment = async (uuid, updateDepartment) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const departmentToBeUpdated = await Department.findOne({
        where: {
          uuid: uuid,
        },
      });
      await departmentToBeUpdated.set({
        deptName: updateDepartment,
      });
      await departmentToBeUpdated.save();
      return departmentToBeUpdated;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteDepartment = async (uuid) => {
  try {
    sequelize.transaction(async (t) => {
      await Department.destroy({
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
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
