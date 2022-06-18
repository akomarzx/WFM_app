const {employeeEvents} = require('../services/employeeServices');

const createPunchInfo = async () => {
  console.log('Hello from punchInfoServices');
};

employeeEvents.on('employeeCreated', createPunchInfo);

module.exports = {createPunchInfo};
