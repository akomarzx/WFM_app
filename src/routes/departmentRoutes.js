
const express = require('express');
const departmentController = require('../controller/departmentController');
// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-department', roleController.getCreateRoleForm);
router.get('/update-department', roleController.getUpdateRoleForm);
router.get('/delete-department', roleController.getDeleteRoleForm);

router.route('/')
    .get(departmentController.getDepartments)
    .post(departmentController.createDepartment);

router.route('/:id')
    .get(departmentController.getDepartment)
    .put(departmentController.updateDepartment)
    .delete(departmentController.deleteDepartmentg);

module.exports = router;
