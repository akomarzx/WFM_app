const {eventEmitter} = require('../services/employeeServices');

const createPunchInfo = async () => {
  console.log('Hello from punchInfoServices');
};

eventEmitter.on('employeeCreated', createPunchInfo);

module.exports = {createPunchInfo};
