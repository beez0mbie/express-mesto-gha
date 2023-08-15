const CustomError = require('./customError');

class InvalidEmailOrPassword extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'InvalidEmailOrPassword';
    this.message = { message: 'Неправильные почта или пароль' };
    this.statusCode = 401;
  }
}

module.exports = InvalidEmailOrPassword;
