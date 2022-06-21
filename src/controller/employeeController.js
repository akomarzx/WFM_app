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

const updateEmployee = asyncWrapper(async (req, res, next) => {
  const updatedEmployee =
  await EmployeeSerivces.updateEmployee(req.params.id, req.body);
  res.status(200).json(updatedEmployee);
});

const deleteEmployee = asyncWrapper(async (req, res, next) => {
  const employeeToBeDeleted =
  await EmployeeSerivces.deleteEmployee(req.params.id);
  res.status(200).json({message: 'Succesfully Deleted'});
});

module.exports = {
  getEmployee, getEmployees,
  createEmployee, updateEmployee,
  deleteEmployee,
};
