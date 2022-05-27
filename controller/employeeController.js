let { sequelize, Employee } = require('../models');

let get_all_employee = async (req, res) => {
  try {
    const list = await Employee.findAll();
    res.json(list);
  } catch (e) {
    res.send(e.message);
  }
};
let create_employee = async (req, res) => {
  let body = req.body;
  console.log(body)
  try {
    const emp = await Employee.create({
      first_name: body.first_name,
      last_name: body.last_name,
      birth_date: body.birth_date,
      sex: body.sex,
      employment_status: body.employment_status,
    });
    res.redirect('/');
  } catch (e) {
    res.json(e.message);
  }
};

module.exports = {
  get_all_employee, create_employee
};
