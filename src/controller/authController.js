const {registerUserService} = require('../services/authenticationServices');
const ApiError = require('../utils/apiError');

const registerUser = async (req, res) => {
  const {email, password, regCode} = req.body;
  try {
    await registerUserService(email, password, regCode);
    req.flash('success', 'Registration Successful');
    return res.redirect('login/');
  } catch (error) {
    if (error instanceof ApiError) {
      req.flash('error', error.message);
      return res.redirect('back');
    }
    throw error;
  }
};

const getLoginPage = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('../views/authViews/loginPage');
};

const getRegistrationPage = (req, res) => {
  res.render('../views/authViews/registrationPage');
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
