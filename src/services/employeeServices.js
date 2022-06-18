const EventEmitter = require('events');
const employeeEvents = new EventEmitter();

const createEmployee = async () => {
  console.log('Employee Being Created');
  employeeEvents.emit('employeeCreated', 'Hello from employee services');
};

module.exports = {createEmployee, employeeEvents};
