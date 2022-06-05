const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')


router.get('/login', authController.get_login_page); 
router.get('/register',authController.get_registration_page);
 
router.post('/login', authController.login_user)
router.post('/register', authController.register_user);
module.exports = router;
