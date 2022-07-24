const {EmployeeServices,
  DepartmentServices,
  PositionServices} = require('../services');

const asyncWrapper = require('../utils/asyncWrapper');

const getCreateEmployeeForm = asyncWrapper(async (req, res, next) => {
  res.locals.departments = await DepartmentServices.getDepartments();
  res.locals.positions = await PositionServices.getPositions();
  res.status(200).render('./employeeViews/createEmployeeForm');
});
const getEmployee = asyncWrapper(async (req, res, next) => {
  const employee = await EmployeeServices.getEmployee(req.params.id);
  res.status(200).json(employee);
});

const getEmployees = asyncWrapper(async (req, res, next) => {
  const employees = await EmployeeServices.getEmployees();
  res.status(200).json(employees);
});

const createEmployee = asyncWrapper(async (req, res, next) => {
  const newEmployee = await EmployeeServices.createEmployee(req.body);
  res.status(201).json({employee: newEmployee});
});

const updateEmployee = asyncWrapper(async (req, res, next) => {
  const updatedEmployee =
  await EmployeeServices.updateEmployee(req.params.id, req.body);
  res.status(200).json(updatedEmployee);
});

const deleteEmployee = asyncWrapper(async (req, res, next) => {
  await EmployeeServices.deleteEmployee(req.params.id);
  res.status(200).json({message: 'Succesfully Deleted'});
});

module.exports = {
  getCreateEmployeeForm,
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
