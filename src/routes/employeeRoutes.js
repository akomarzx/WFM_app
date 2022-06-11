const employeeController = require('../controller/employeeController');

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', employeeController.get_all_employee);
router.post('/', employeeController.create_employee);

module.exports = router;
