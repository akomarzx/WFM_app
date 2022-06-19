const EmployeeSerivces = require('../services/employeeServices');
const getAllEmployee = async (req, res, next) => {
};

const createEmployee = async (req, res, next) => {
  // FIXME Still res after the error.
  const newEmployee = await EmployeeSerivces.createEmployee(req.body, next);
  res.json({employee: newEmployee});
};

module.exports = {
  getAllEmployee,
  createEmployee,
};
