const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const createEmployee = async () => {
  console.log('Employee Being Created');
  eventEmitter.emit('employeeCreated', 'Hello from employee services');
};

module.exports = {createEmployee, eventEmitter};
