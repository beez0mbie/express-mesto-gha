const CustomError = require('./customError');

class InvalidCardIdError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'InvalidCardIdError';
    this.message = { message: 'Карточки с таким ID не существует в базе' };
    this.statusCode = 404;
  }
}

module.exports = InvalidCardIdError;
