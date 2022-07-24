const {sequelize, Department} = require('../models');

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

module.exports = {
  getDepartments,
};
