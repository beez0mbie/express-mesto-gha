const jwt = require('jsonwebtoken');
const { handleErrors } = require('../utils/errors');
const AuthError = require('../errors/authError');
const getJwtSecretKey = require('../utils/getJwtSecretKey');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const authorizationMethod = 'Bearer ';
  if (!authorization || !authorization.startsWith(authorizationMethod)) {
    return handleErrors(new AuthError(), res);
  }

  let payload;

  try {
    const token = authorization.replace(authorizationMethod, '');
    payload = jwt.verify(token, getJwtSecretKey());
  } catch (err) {
    return handleErrors(new AuthError(), res);
  }

  req.user = payload;
  next();
};

module.exports = auth;
