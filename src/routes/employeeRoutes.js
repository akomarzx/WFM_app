const employeeController = require('../controller/employeeController');

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', employeeController.getAllEmployee);
router.post('/', employeeController.createEmployee);

module.exports = router;
