
const express = require('express');
const departmentController = require('../controller/departmentController');
// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-department',
    departmentController.getCreateDepartmentForm);

router.get('/update-department',
    departmentController.getUpdateDepartmentForm);

router.get('/delete-department',
    departmentController.getDeleteDepartmentForm);

router.get('/show-departments',
    departmentController.getShowDepartmentsPage);

router.route('/')
    .get(departmentController.getDepartments)
    .post(departmentController.createDepartment);

router.route('/:id')
    .get(departmentController.getDepartment)
    .patch(departmentController.updateDepartment)
    .delete(departmentController.deleteDepartment);


module.exports = router;
