const {employeeEvents} = require('./employeeServices');

employeeEvents.on('employeeCreated', async (data) => {
  console.log(data);
});
