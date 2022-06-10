const EmployeeServices = require('../services/employeeServices');


let get_all_employee = async (req, res) => {
  
};

let create_employee = async (req, res) => {
  EmployeeServicesInstance.createEmployee();
  res.send('hello') 
};

module.exports = {
  get_all_employee,
  create_employee,
};
