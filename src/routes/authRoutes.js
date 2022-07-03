const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controller/authController');
const {logInSchema} = require('../utils/schemas.js');
const validateInput = require('../middlewares/validateInput');

module.exports = function(passport) {
  router.get('/login', authController.getLoginPage);
  router.get('/register', authController.getRegistrationPage);
  router.get('/signout', authController.signOut);

  router.post('/login', validateInput(logInSchema),
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: 'login/',
        failureFlash: true,
      }));
  router.post('/register', authController.registerUser);

  return router;
};
