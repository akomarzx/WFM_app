const employeeController = require('../controller/employeeController');

const express = require('express');

const router = express.Router();

router.get('/', employeeController.get_all_employee);
router.post('/', employeeController.create_employee);

module.exports = router;
