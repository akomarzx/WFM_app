const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('index');
});

module.exports = router;
