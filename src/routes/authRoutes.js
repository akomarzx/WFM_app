const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controller/authController');

module.exports = function(passport) {
  router.get('/login', authController.get_login_page);
  router.get('/register', authController.get_registration_page);
  router.get('/signout', authController.sign_out);

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: 'login/',
    failureFlash: true,
  }));
  router.post('/register', authController.register_user);


  return router;
};
