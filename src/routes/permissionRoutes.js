// FIXME: update is broken
// TODO: validation
const express = require('express');
const permissionController = require('../controller/permissionController');
// eslint-disable-next-line new-cap
const router = express.Router();
const {permissionSchema} = require('../utils/schemas');
const validateInput = require('../middlewares/validateInput');

router.get('/create-permission', permissionController.getCreatePermissionForm);
router.get('/update-permission', permissionController.getUpdatePermissionForm);
router.get('/delete-permission', permissionController.getDeletePermissionForm);

router.post('/',
    validateInput(permissionSchema),
    permissionController.createPermission);
router.put('/',
    validateInput(permissionSchema),
    permissionController.updatePermission);

router.delete('/', permissionController.deletePermission);

module.exports = router;
