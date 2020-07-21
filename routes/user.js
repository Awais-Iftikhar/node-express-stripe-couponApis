const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/users');

router.post('/api/signup' , usercontroller.signupuser);

module.exports = router;
