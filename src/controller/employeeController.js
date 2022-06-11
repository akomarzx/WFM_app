const EmployeeSerivces = require('../services/employeeServices');
const getAllEmployee = async (req, res) => {

};

const createEmployee = async (req, res) => {
  await EmployeeSerivces.createEmployee(req.body);
  res.json({message: 'hello'});
};

module.exports = {
  getAllEmployee,
  createEmployee,
};
