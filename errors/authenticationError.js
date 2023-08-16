const CustomError = require('./customError');

class AuthenticationError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'authenticationError';
    this.message = { message: 'Нет прав удалить данную карточку' };
    this.statusCode = 403;
  }
}

module.exports = AuthenticationError;
