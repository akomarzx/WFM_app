// TODO: Validation
const EventEmitter = require('events');
const employeeEvents = new EventEmitter();
const moment = require('moment');

const {Employee, Department, Position, sequelize} = require('../models');

const getEmployees = async () => {
  try {
    const result = sequelize.transaction(async (t) => {
      const employees = await Employee.findAll(
          {include: [Department, Position]});
      return employees;
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEmployee = async (id) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const employee = await Employee.findOne({
        where: {
          uuid: id,
        },
      });
      // TODO throw an exception if nothing is found,
      // Impelement Error objects. Catch matching error thrown
      if (employee) {
        return employee;
      }
      throw new Error('Employee Not Found!');
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEmployee = async (employeeData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newEmployee = await Employee.create({
        dept_id: employeeData.dept_id,
        super_id: employeeData.super_id,
        position_id: employeeData.position_id,
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        birth_date: moment(employeeData.birth_date, ('YYYY-MM-DD'), true),
        sex: employeeData.sex,
        employment_status: employeeData.employment_status,
      }, {transaction: t});
      employeeEvents.emit('employeeCreated', newEmployee);
      return newEmployee;
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateEmployee = async (id, employeeData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const employeeToBeUpdated = await Employee.findOne({
        where: {
          uuid: id,
        },
      });
      if (employeeToBeUpdated != null) {
        await employeeToBeUpdated.set({
          dept_id: employeeData.dept_id,
          super_id: employeeData.super_id,
          position_id: employeeData.position_id,
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          birth_date: moment(employeeData.birth_date, ('YYYY-MM-DD'), true),
          sex: employeeData.sex,
          employment_status: employeeData.employment_status,
        });
        await employeeToBeUpdated.save();
        return employeeToBeUpdated;
      }
      throw new Error('Resource not found!');
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEmployee = async (id) => {
  try {
    await sequelize.transaction(async (t) => {
      const employeeToBeDeleted = await Employee.findOne({
        where: {
          uuid: id,
        },
      });
      if (employeeToBeDeleted != null) {
        await employeeToBeDeleted.destroy();
        employeeEvents.emit('employeeDeleted', employeeToBeDeleted);
        return;
      }
      throw new Error('Resource Not Found!');
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

employeeEvents.on('employeeDeleted', async (employee) => {
  await employee.update({
    employment_status: 'inactive',
  });
});


module.exports = {getEmployee, getEmployees,
  createEmployee, updateEmployee,
  deleteEmployee, employeeEvents};
