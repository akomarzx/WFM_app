const express = require('express');
const router = express.Router();
const { PunchInfo, User } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
let get_login_page = (req, res) => {
  res.render('../views/authViews/loginPage');
};

let get_registration_page = (req, res) => {
  res.render('../views/authViews/registrationPage');
};

let login_user = async (req, res) => {};

let register_user = async (req, res) => {
  let { email, password, regCode } = req.body;
  // Use the punch info as the registration code and check email in user db to check if email already exists
  // so that only employees can register
  // Add server side validation afterwards

  try {
    let punch_info = await PunchInfo.findByPk(regCode);
    let user = await User.findOne({where : {
      [Op.or] : [
        {email : email},
        {emp_id : punch_info.emp_id}
      ]
    }});
    
    if (punch_info == null || user != null) {
      req.flash(
        'error',
        'One of the information is invalid or already exist in the system'
      );
      return res.redirect('register/');
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email : email,
      hash : hashedPassword,
      emp_id : punch_info.emp_id
    })
    req.flash('success' , 'Registration Successful');
    res.redirect('login/')
  } catch (e) {
    req.flash(
      'error', e.message
    );
    res.redirect('register/')
  }
};

module.exports = {
  get_login_page,
  get_registration_page,
  login_user,
  register_user,
};
