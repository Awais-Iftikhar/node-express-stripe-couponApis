const jwt = require('jsonwebtoken');

const middleware = ((req,res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token,'my_secret_key_for_login_user');
    next();
  } catch (error) {
    res.status(401).json({
      message: 'You are not Authenticated'
    })
  }
});

module.exports = middleware;
