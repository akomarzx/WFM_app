const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controller/authController');
const {logInSchema, registrationSchema} = require('../utils/schemas.js');
const validateInput = require('../middlewares/validateInput');

module.exports = function(passport) {
  router.get('/login', authController.getLoginPage);
  router.get('/signout', authController.signOut);

  router.get('/register', authController.getRegistrationPage);

  router.post('/login', validateInput(logInSchema),
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: 'login/',
        failureFlash: true,
      }));
  router.post('/register', validateInput(registrationSchema),
      authController.registerUser);

  return router;
};
