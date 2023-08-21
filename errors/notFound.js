const CustomError = require('./customError');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'notFound';
    this.message = { message };
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
