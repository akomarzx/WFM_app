const { PunchInfo, Attendance } = require('../models');

let create_attendance = async (req, res) => {
  let { punchId } = req.body;
  try {
    let punchInfo = await PunchInfo.findOne({ where: { punch_id: punchId } });
    if (punchInfo) {
      let emp_attendance = Attendance.create({
        emp_id: punchInfo.emp_id,
      });
      res.json(emp_attendance);
    } else {
      req.flash('error', 'Invalid punch-id');
      res.redirect('/');
    }
  } catch (e) {
    res.json(e.message);
  }
};
let get_all_attendance = async (req, res) => {
  try {
    const list = await Attendance.findAll();
    res.json(list);
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/');
  }
};
module.exports = {
  create_attendance,
};
