const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('../views/authViews/loginPage');
});
router.get('/register', (req, res) => {
  res.render('../views/authViews/registrationPage');
});

module.exports = router;
