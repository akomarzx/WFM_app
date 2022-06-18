const {PunchInfo, User} = require('../models');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');

const getLoginPage = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('../views/authViews/loginPage');
};

const getRegistrationPage = (req, res) => {
  res.render('../views/authViews/registrationPage');
};

const registerUser = async (req, res) => {
  const {email, password, regCode} = req.body;
  // TODO Move to service layer
  try {
    const punchInfo = await PunchInfo.findByPk(regCode);
    if (punchInfo == null) {
      throw new Error(
          'One of the information is invalid or already exist in the system');
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {email: email},
          {emp_id: punchInfo.emp_id},
        ],
      },
    });
    if (punchInfo == null || user != null) {
      req.flash(
          'error',
          'One of the information is invalid or already exist in the system',
      );
      return res.redirect('register/');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      hash: hashedPassword,
      emp_id: punchInfo.emp_id,
    });
    req.flash('success', 'Registration Successful');
    res.redirect('login/');
  } catch (e) {
    req.flash(
        'error', e.message,
    );
    res.redirect('register/');
  }
};
const signOut = (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};


module.exports = {
  getLoginPage,
  getRegistrationPage,
  registerUser,
  signOut,
};
