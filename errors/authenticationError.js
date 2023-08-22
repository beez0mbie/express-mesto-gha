const CustomError = require('./customError');

class AuthenticationError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'authenticationError';
    this.statusCode = 403;
  }
}

module.exports = AuthenticationError;
