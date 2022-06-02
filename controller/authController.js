const express = require('express')
const router = express.Router();

let get_login_page = (req, res) => {
  res.render('../views/authViews/loginPage');
};

let get_registration_page = (req, res) => {
  res.render('../views/authViews/registrationPage');
};

module.exports = {
    get_login_page , get_registration_page
}