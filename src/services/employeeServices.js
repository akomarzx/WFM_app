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
        roleId: employeeData.roleId,
        deptId: employeeData.deptId,
        superId: employeeData.superId,
        positionId: employeeData.positionId,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        birthDate: moment(employeeData.birthDate, ('YYYY-MM-DD'), true),
        sex: employeeData.sex,
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
        deptId: employeeData.deptId,
        superId: employeeData.superId,
        positionId: employeeData.positionId,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        birthDate: moment(employeeData.birthDate, ('YYYY-MM-DD'), true),
        sex: employeeData.sex,
        employmentStatus: employeeData.employmentStatus,
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
      employmentStatus: 'INACTIVE',
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
