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


exports.loginuser = (req,res, next) => {
    let fetchuser;
    User.findOne({ email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(404).json({
          message: 'No user with this email'
        });
      }
      fetchuser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message: 'password does not match'
        });
      }
      res.status(200).json({
        message: 'login success',
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Login failed',
      });
    })
  }
  