const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const getJwtSecretKey = require('../utils/getJwtSecretKey');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const authorizationMethod = 'Bearer ';
  if (!authorization || !authorization.startsWith(authorizationMethod)) {
    next(new AuthError());
  }

  let payload;

  try {
    const token = authorization.replace(authorizationMethod, '');
    payload = jwt.verify(token, getJwtSecretKey());
  } catch (err) {
    next(new AuthError());
  }

  req.user = payload;
  next();
};

module.exports = auth;
