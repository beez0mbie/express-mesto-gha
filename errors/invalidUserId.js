class InvalidUserIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidUserIdError';
    this.message = { message: 'Пользователя с таким ID не существует в базе' };
    this.statusCode = 400;
  }
}

module.exports = InvalidUserIdError;
