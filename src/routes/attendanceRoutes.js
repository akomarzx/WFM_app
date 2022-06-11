const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const attendanceController = require('../controller/attendanceController');

router.post('/', attendanceController.create_attendance);
router.get('/', attendanceController.get_all_attendance);
module.exports = router;
