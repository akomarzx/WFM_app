const express = require('express');
const permissionController = require('../controller/permissionController');
// eslint-disable-next-line new-cap
const router = express.Router();
const {permissionSchema} = require('../utils/schemas');
const validateInput = require('../middlewares/validateInput');

router.route('/')
    .post(validateInput(permissionSchema),
        permissionController.createPermission)
    .get(permissionController.getPermissions);

router.route('/:id')
    .get(permissionController.getPermission)
    .patch(permissionController.updatePermission)
    .delete(permissionController.deletePermission);

module.exports = router;
