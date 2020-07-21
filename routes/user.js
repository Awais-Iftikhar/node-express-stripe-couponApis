const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/users');

router.post('/api/users/signup' , usercontroller.signupuser);
router.post('/api/users/login' , usercontroller.loginuser);


module.exports = router;
