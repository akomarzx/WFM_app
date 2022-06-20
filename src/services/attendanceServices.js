const {employeeEvents} = require('./employeeServices');

employeeEvents.on('employeeCreated', async () => {
  console.log('Hello from attendance service');
});
