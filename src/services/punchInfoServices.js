const {sequelize, PunchInfo} = require('../models');
// This will be called everytime a
// new Employee is inserted into the database
// Currently Not handling in the event
// that the employee is succesfully added
// but when connection is lost the punch info will not
// be created

const createPunchInfo = async (employee) => {
  try {
    await PunchInfo.create({
      emp_id: employee.emp_id,
    });
  } catch (error) {
    throw error;
  }
};


module.exports = {createPunchInfo};
