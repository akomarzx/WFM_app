const express = require('express');
const rolePermissionController =
    require('../controller/rolePermissionController');

// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/',
    rolePermissionController.createRolePermission);

router.delete('/',
    rolePermissionController.deleteRolePermission);

module.exports = router;
