const employeeController = require('../controller/employeeController');
const {employeeSchema} = require('../utils/schemas');
const validate = require('../middlewares/validateInput');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthorized = require('../middlewares/isAuthorized');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/')
    .get(
        employeeController.getEmployees)
    .post(isLoggedIn,
        isAuthorized('CREATE_EMPLOYEE'),
        validate(employeeSchema),
        employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(validate(employeeSchema),
        employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;
