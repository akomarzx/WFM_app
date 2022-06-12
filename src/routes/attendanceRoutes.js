const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const attendanceController = require('../controller/attendanceController');

router.post('/', attendanceController.createAttendance);
router.get('/', attendanceController.getAllAttendance);
module.exports = router;
