const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controller/authController');

module.exports = function(passport) {
  router.get('/login', authController.getLoginPage);
  router.get('/register', authController.getRegistrationPage);
  router.get('/signout', authController.signOut);

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: 'login/',
    failureFlash: true,
  }));
  router.post('/register', authController.registerUser);

  router.get('/test', async (req, res, next) => {

  });

  return router;
};
