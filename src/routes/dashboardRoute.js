const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.use(isLoggedIn);
router.get('/', dashboardController.getDashboard);
module.exports = router;
