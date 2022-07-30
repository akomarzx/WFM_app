// TODO: Add View route in the roles and permission dashboard!
// For roles and permissions
const express = require('express');
const permissionController = require('../controller/permissionController');
// eslint-disable-next-line new-cap
const router = express.Router();
const {permissionSchema} = require('../utils/schemas');
const validateInput = require('../middlewares/validateInput');

router.get('/create-permission',
    permissionController.getCreatePermissionForm);

router.get('/update-permission',
    permissionController.getUpdatePermissionForm);

router.get('/delete-permission',
    permissionController.getDeletePermissionForm);

router.get('/show-permissions',
    permissionController.getShowPermissionsPage);

router.route('/')
    .post(validateInput(permissionSchema),
        permissionController.createPermission)
    .get(permissionController.getPermissions);

router.route('/:id')
    .get(permissionController.getPermission)
    .patch(permissionController.updatePermission)
    .delete(permissionController.deletePermission);

module.exports = router;
