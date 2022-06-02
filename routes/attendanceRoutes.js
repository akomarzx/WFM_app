const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendanceController');

router.post('/', attendanceController.create_attendance);
router.get('/', attendanceController.get_all_attendance);
module.exports = router;
