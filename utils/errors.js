const CustomError = require('../errors/customError');

const defaultServerError = (err, res) => res.status(500).send({ message: `Server Error ${err.message}` });

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    const message = err.errors ? `${Object.values(err.errors).map((error) => error.message).join(', ')}` : `Server Error ${err.name}: ${err.message}`;
    return res.status(400).send({
      message,
    });
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.message);
  }
  return defaultServerError(err, res);
};

module.exports = { handleErrors };
