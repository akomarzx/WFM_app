const {eventEmitter} = require('../services/employeeServices');

console.log('Hello World');

const createPunchInfo = async () => {
  console.log('Hello from punchInfoServices');
};

eventEmitter.on('employeeCreated', createPunchInfo);

module.exports = {createPunchInfo};
