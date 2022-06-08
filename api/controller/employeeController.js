let { sequelize, Employee, PunchInfo } = require('../models');

let get_all_employee = async (req, res) => {
  try {
    const array = await Employee.findAll({ include: [PunchInfo] });
    res.json(array);
    // res.render('../views/employeeViews/showEmployees', { array });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/');
  }
};

let create_employee = async (req, res) => {
  let body = req.body;
  console.log(body);
  try {
    const emp = await Employee.create({
      first_name: body.first_name,
      last_name: body.last_name,
      birth_date: body.birth_date,
      sex: body.sex.toLowerCase(),
      employment_status: body.employment_status.toLowerCase(),
    });
    const punch_info = await PunchInfo.create({
      emp_id: emp.emp_id,
    });
    res.redirect('/');
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/');
  }
};

module.exports = {
  get_all_employee,
  create_employee,
};
