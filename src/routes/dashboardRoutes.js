const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isRoleAllowed = require('../middlewares/isRoleAllowed');

router.use(isLoggedIn);

router.get('/', dashboardController.getDashboard);

router.get('/departments',
    isLoggedIn,
    isRoleAllowed('SUPER_ADMIN'),
    dashboardController.getDepartmentDashboard);

router.get('/roles-permissions',
    isLoggedIn,
    isRoleAllowed('SUPER_ADMIN'),
    dashboardController.getRolesPermissionsDashboard);

module.exports = router;
