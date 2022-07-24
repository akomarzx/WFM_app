
const express = require('express');
const departmentController = require('../controller/departmentController');
// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-department', departmentController.getCreateDepartmentForm);
router.get('/update-department', departmentController.getUpdateDepartmentForm);
router.get('/delete-department', departmentController.getDeleteDepartmentForm);

router.route('/')
    .get(departmentController.getDepartments)
    .post(departmentController.createDepartment)
    .put(departmentController.updateDepartment)
    .delete(departmentController.deleteDepartment);

router.route('/:id')
    .get(departmentController.getDepartment);


module.exports = router;
