const employeeController = require('../controller/employeeController');

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', employeeController.getEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

router.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err.stack);
});

module.exports = router;
