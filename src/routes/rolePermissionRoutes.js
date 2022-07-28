const express = require('express');
const rolePermissionController =
    require('../controller/rolePermissionController');

// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-rolePermission',
    rolePermissionController.getCreateRolePermissionForm);

router.get('/show-rolePermission',
    rolePermissionController.getViewRolePermissionForm);

router.get('/delete-rolePermission',
    rolePermissionController.getDeleteRolePermissionForm);

router.post('/',
    rolePermissionController.createRolePermission);

router.delete('/',
    rolePermissionController.deleteRolePermission);

module.exports = router;
