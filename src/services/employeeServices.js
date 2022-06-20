const EventEmitter = require('events');
const employeeEvents = new EventEmitter();
const moment = require('moment');

const {Employee, Department, Position} = require('../models');

const getEmployees = async () => {
  try {
    const employees = await Employee.findAll({include: [Department, Position]});
    return employees;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEmployee = async (employeeData) => {
  try {
    const newEmployee = await Employee.create({
      dept_id: employeeData.dept_id,
      super_id: employeeData.super_id,
      position_id: employeeData.position_id,
      first_name: employeeData.first_name,
      last_name: employeeData.last_name,
      birth_date: moment(employeeData.birth_date, ('YYYY-MM-DD')),
      sex: employeeData.sex,
      employment_status: employeeData.employment_status,
    });
    return newEmployee;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {getEmployees, createEmployee, employeeEvents};
