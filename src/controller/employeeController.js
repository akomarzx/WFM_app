const EmployeeSerivces = require('../services/employeeServices');
const asyncWrapper = require('../utils/asyncWrapper');

const getEmployee = asyncWrapper(async (req, res, next) => {
  const employee = await EmployeeSerivces.getEmployee(req.params.id);
  res.status(200).json(employee);
});

const getEmployees = asyncWrapper(async (req, res, next) => {
  const employees = await EmployeeSerivces.getEmployees();
  res.status(200).json(employees);
});

const createEmployee = asyncWrapper(async (req, res, next) => {
  const newEmployee = await EmployeeSerivces.createEmployee(req.body);
  res.status(201).json({employee: newEmployee});
});

module.exports = {getEmployee, getEmployees, createEmployee};
