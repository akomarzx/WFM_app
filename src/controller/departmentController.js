// TODO: validation
const {DepartmentServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreateDepartmentForm = asyncWrapper(async (req, res, next) => {
  res.status(200).render('./departmentViews/createDepartmentView');
});

const getUpdateDepartmentForm = asyncWrapper(async (req, res, next) => {
  res.locals.departments = await DepartmentServices.getDepartments();
  res.status(200).render('./departmentViews/updateDepartmentView');
});

const getDeleteDepartmentForm = asyncWrapper(async (req, res, next) => {
  res.locals.departments = await DepartmentServices.getDepartments();
  res.status(200).render('./departmentViews/deleteDepartmentView');
});

const getShowDepartmentsPage = asyncWrapper(async (req, res, next) => {
  res.locals.departments = await DepartmentServices.getDepartments();
  res.status(200).render('./departmentViews/showDepartmentsView');
});

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
  await DepartmentServices.createDepartment(deptName);
  req.flash('success', 'Department Created Succesfully');
  res.status(200).redirect('back');
});

const updateDepartment = asyncWrapper(async (req, res, next) => {
  await DepartmentServices.updateDepartment(req.body.uuid, req.body.deptName);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deleteDepartment = asyncWrapper(async (req, res, next) => {
  await DepartmentServices.deleteDepartment(req.body.uuid);
  req.flash('success', 'Deleted Succesfully');
  res.redirect('back');
});

module.exports = {
  getCreateDepartmentForm,
  getUpdateDepartmentForm,
  getDeleteDepartmentForm,
  getShowDepartmentsPage,
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
