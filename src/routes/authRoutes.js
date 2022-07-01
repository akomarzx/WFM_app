const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controller/authController');
const {Permission, Role} = require('../models');

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
    try {
      const result = await Role.findAll({
        where: {
          role_id: 1,
        },
        include: Permission,
      });
      res.json({response: result});
    } catch (error) {
      res.json({message: error.message});
    };
  });

  return router;
};
