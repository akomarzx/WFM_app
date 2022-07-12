
// TODO: validation
const express = require('express');
const permissionController = require('../controller/permissionController');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-permission', permissionController.getCreatePermissionForm);
router.get('/update-permission', permissionController.getUpdatePermissionForm);
router.get('/delete-permission', permissionController.getDeletePermissionForm);

router.post('/', permissionController.createPermission);
router.put('/', permissionController.updatePermission);
router.delete('/', permissionController.deletePermission);

module.exports = router;
