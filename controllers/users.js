const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.signupuser = (req,res,next) => {
  const userdata = req.body;
  bcrypt.hash(userdata.password , 10)
  .then(hashpass => {
    const user = new User({
      email: userdata.email,
      password: hashpass
    });
    user.save()
    .then(result => {
        console.log(result);
      res.status(201).json({
        message: 'created successfully',
        data: result
      });
    })
    .catch(err => {
      res.status(403).json({
        message: 'email already exists',
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Sign up failure'
    });
  });
}