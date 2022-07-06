const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isRoleAllowed = require('../middlewares/isRoleAllowed');

router.use((req, res, next) => {
  res.locals.employee = req.user;
  next();
});
router.use(isLoggedIn);

router.get('/', dashboardController.getDashboard);

router.get('/roles-permissions',
    isLoggedIn,
    isRoleAllowed('ADMIN'),
    dashboardController.getRolesPermissionsDashboard);

module.exports = router;
