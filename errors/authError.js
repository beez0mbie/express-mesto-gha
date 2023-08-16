const CustomError = require('./customError');

class AuthError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'authError';
    this.message = { message: 'Необходима авторизация' };
    this.statusCode = 401;
  }
}

module.exports = AuthError;
