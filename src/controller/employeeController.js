const EmployeeSerivces = require('../services/employeeServices');
const asyncWrapper = require('../utils/asyncWrapper');

const getAllEmployee = async (req, res, next) => {
};

const createEmployee= asyncWrapper(async (req, res, next) => {
  try {
    const newEmployee = await EmployeeSerivces.createEmployee(req.body);
    res.json({employee: newEmployee});
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllEmployee,
  createEmployee,
};
