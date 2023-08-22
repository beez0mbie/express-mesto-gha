class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = { message };
    this.name = 'CustomError';
  }
}

module.exports = CustomError;
