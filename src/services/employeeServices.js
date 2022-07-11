// TODO: Update and Delete can be simplified
// by using a where clause, but loses the reference of
// the current object in process

const EventEmitter = require('events');
const employeeEvents = new EventEmitter();
const moment = require('moment');

const {createPunchInfo, deletePunchInfo} = require('./punchInfoServices');
const {Employee, Department, Position, PunchInfo,
  sequelize} = require('../models');

const getEmployees = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const employees = await Employee.findAll(
          {include: [Department, Position, PunchInfo],
            rejectOnEmpty: true,
            benchmark: true});
      return employees;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const getEmployee = async (id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const employee = await Employee.findOne({
        where: {
          uuid: id,
        },
        rejectOnEmpty: true,
        include: [Department, Position, PunchInfo],
      });
      return employee;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (employeeData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newEmployee = await Employee.create({
        role_id: employeeData.role_id,
        dept_id: employeeData.dept_id,
        super_id: employeeData.super_id,
        position_id: employeeData.position_id,
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        birth_date: moment(employeeData.birth_date, ('YYYY-MM-DD'), true),
        sex: employeeData.sex,
        employment_status: employeeData.employment_status,
      }, {benchmark: true});
      await createPunchInfo(newEmployee);
      return newEmployee;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (id, employeeData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const employeeToBeUpdated = await Employee.findOne({
        where: {
          uuid: id,
        },
        rejectOnEmpty: true,
      });
      await employeeToBeUpdated.set({
        dept_id: employeeData.dept_id,
        super_id: employeeData.super_id,
        position_id: employeeData.position_id,
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        birth_date: moment(employeeData.birth_date, ('YYYY-MM-DD'), true),
        sex: employeeData.sex,
        employment_status: employeeData.employment_status,
      }, {benchmark: true});
      return employeeToBeUpdated;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    await sequelize.transaction(async (t) => {
      const employeeToBeDeleted = await Employee.findOne({
        where: {
          uuid: id,
        },
        rejectOnEmpty: true,
      });
      await employeeToBeDeleted.destroy();
      await updateEmployementStatusWhenDeleted(employeeToBeDeleted);
      await deletePunchInfo(employeeToBeDeleted.emp_id);
    });
  } catch (error) {
    throw error;
  }
};

const updateEmployementStatusWhenDeleted = async (employee) => {
  try {
    await employee.update({
      employment_status: 'inactive',
    });
  } catch (error) {
    throw error;
  }
};


module.exports = {getEmployee, getEmployees,
  createEmployee, updateEmployee,
  deleteEmployee, employeeEvents};
