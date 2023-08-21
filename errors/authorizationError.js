const CustomError = require('./customError');

class AuthorizationError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'authorizationError';
    this.message = { message };
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
