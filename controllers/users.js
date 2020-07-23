const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

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
      message: 'invalid credentials'
    });
  });
}


exports.loginuser = (req,res, next) => {
    let fetchuser;
    User.findOne({ email: req.body.email})
    .then(user => {
      console.log(user);
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
      const token = jwt.sign({user : fetchuser.email},'my_secret_key_for_login_user');
      res.status(200).json({
        message: 'login success',
        token: token
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    })
  }
  