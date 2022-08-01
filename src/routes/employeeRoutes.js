/* eslint-disable new-cap */
// TODO: Add Image into the form

const employeeController = require('../controller/employeeController');
const {employeeSchema} = require('../utils/schemas');
const validate = require('../middlewares/validateInput');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthorized = require('../middlewares/isAuthorized');
const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' +
    Date.now() + path.extname(file.originalname));
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter});

const router = express.Router();

router.get('/create-employee',
    isLoggedIn,
    isAuthorized('CREATE_EMPLOYEE'),
    employeeController.getCreateEmployeeForm);

router.route('/')
    .get(
        employeeController.getEmployees)
    .post(isLoggedIn,
        isAuthorized('CREATE_EMPLOYEE'),
        upload.single('empImage'),
        validate(employeeSchema),
        employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(validate(employeeSchema),
        employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;
