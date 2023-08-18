const CustomError = require('./customError');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'notFound';
    this.message = { message: 'Resource not found' };
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
