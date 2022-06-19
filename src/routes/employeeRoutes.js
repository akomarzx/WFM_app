const employeeController = require('../controller/employeeController');

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', employeeController.getAllEmployee);
router.post('/', employeeController.createEmployee);

router.use((err, req, res, next)=> {
  res.send(err.stack);
});

module.exports = router;
