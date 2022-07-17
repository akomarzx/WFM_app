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
      empId: employee.empId,
    });
  } catch (error) {
    throw error;
  }
};
// Sequelize onDelete is not currently working with
// Soft-deletion aka paranoid tables.
// this will be called when a employee is destroyed
// this will disable the punch number of the deleted employee.
const deletePunchInfo = async (empId) => {
  try {
    await sequelize.transaction(async (t) => {
      await PunchInfo.destroy({
        where: {
          empId: empId,
        },
        rejectOnEmpty: true,
      });
    });
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createPunchInfo,
  deletePunchInfo,
};
