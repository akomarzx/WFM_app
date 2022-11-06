// TODO: validation
const {DepartmentServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getDepartment = asyncWrapper(async (req, res, next) => {
  const department = await DepartmentServices.getDepartment(req.params.id);
  res.status(200).json(department);
});

const getDepartments = asyncWrapper(async (req, res, next) => {
  const departments = await DepartmentServices.getDepartments();
  res.status(200).json(departments);
});

const createDepartment = asyncWrapper(async (req, res, next) => {
  const {deptName} = req.body;
  const newDept = await DepartmentServices.createDepartment(deptName);
  res.status(200).json(newDept);
});

const updateDepartment = asyncWrapper(async (req, res, next) => {
  await DepartmentServices.updateDepartment(req.body.uuid, req.body.deptName);
  res.status(200).json({message: 'Updated Succesfully'});
});

const deleteDepartment = asyncWrapper(async (req, res, next) => {
  await DepartmentServices.deleteDepartment(req.body.uuid);
  res.status(200).json({message: 'Deleted Succesfully'});
});

module.exports = {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
