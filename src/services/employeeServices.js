const EventEmitter = require('events');
const employeeEvents = new EventEmitter();

const {Employee} = require('../models');

const createEmployee = async (employeeData, next) => {
  const newEmployee = await Employee.create({
    dept_id: employeeData.dept_id,
    super_id: employeeData.super_id,
    position_id: employeeData.position_id,
    first_name: employeeData.first_name,
    last_name: employeeData.last_name,
    birth_date: employeeData.birth_date,
    sex: employeeData.sex,
    employment_status: employeeData.employment_status,
  });
  return newEmployee;
};

module.exports = {createEmployee, employeeEvents};
