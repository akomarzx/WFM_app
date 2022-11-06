/* eslint-disable new-cap */
const employeeController = require('../controller/employeeController');
const {employeeSchema} = require('../utils/schemas');
const {isAuthorized,
  isLoggedIn,
  validateInput,
  upload,
  resize} = require('../middlewares');

const express = require('express');

const router = express.Router();

router.route('/')
    .get(
        employeeController.getEmployees)
    // Add the middleware later
    .post(
        // upload.single('empImage'),
        // resize(300, 300),
        validateInput(employeeSchema),
        employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(validateInput(employeeSchema),
        employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;

