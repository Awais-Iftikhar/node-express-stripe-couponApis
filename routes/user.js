const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/users');

router.post('/signup' , usercontroller.signupuser);
router.post('/login' , usercontroller.loginuser);

module.exports = router;
