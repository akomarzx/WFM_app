/* eslint-disable new-cap */
const employeeController = require('../controller/employeeController');
const {employeeSchema} = require('../utils/schemas');
const {isAuthorized,
  isLoggedIn,
  validateInput} = require('../middlewares');

const express = require('express');

const router = express.Router();

router.route('/')
    .get(
        employeeController.getEmployees)
    .post(
        validateInput(employeeSchema),
        employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(validateInput(employeeSchema),
        employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;

