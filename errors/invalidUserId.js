const CustomError = require('./customError');

class InvalidUserIdError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'InvalidUserIdError';
    this.message = { message: 'Пользователя с таким ID не существует в базе' };
    this.statusCode = 404;
  }
}

module.exports = InvalidUserIdError;
