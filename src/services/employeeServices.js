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

const getEmployee = async (id) => {
  try {
    const employee = await Employee.findOne({
      where: {
        uuid: id,
      },
    });
    // TODO throw an exception is nothing is found,
    // Impelement Error objects and catch if matching to the error thrown
    if (employee) {
      return employee;
    }
    throw new Error('Employee Not Found!');
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
    employeeEvents.emit('employeeCreated', newEmployee);
    return newEmployee;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {getEmployee, getEmployees, createEmployee, employeeEvents};
