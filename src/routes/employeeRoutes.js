// TODO: Validation Middleware for create and put route
// TODO: Authentication and Authorization Middleware
const employeeController = require('../controller/employeeController');
const employeeSchema = require('../schemas/employeeSchema');
const validate = require('../middlewares/validateInput');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', employeeController.getEmployees);
router.post('/',
    employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
