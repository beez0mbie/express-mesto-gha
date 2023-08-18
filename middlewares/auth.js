const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const getJwtSecretKey = require('../utils/getJwtSecretKey');

const auth = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, getJwtSecretKey());
  } catch (err) {
    next(new AuthError());
  }

  req.user = payload;
  next();
};

module.exports = auth;
