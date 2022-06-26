// TODO: Authentication and Authorization Middleware
const employeeController = require('../controller/employeeController');
const {employeeSchema} = require('../utils/schemas');
const validate = require('../middlewares/validateInput');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', employeeController.getEmployees);
router.post('/', validate(employeeSchema),
    employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', validate(employeeSchema), employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
