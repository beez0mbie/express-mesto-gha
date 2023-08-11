const InvalidCardIdError = require('../errors/invalidCardId');
const InvalidUserIdError = require('../errors/invalidUserId');

const handle500Error = (err, res) => res.status(500).send({ message: `Server Error ${err.message}` });

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    const message = err.errors ? `${Object.values(err.errors).map((error) => error.message).join(', ')}` : `Server Error ${err.name}: ${err.message}`;
    return res.status(400).send({
      message,
    });
  }
  if (err instanceof InvalidCardIdError) {
    return res.status(err.statusCode).send(err.message);
  }
  if (err instanceof InvalidUserIdError) {
    return res.status(err.statusCode).send(err.message);
  }
  return handle500Error(err, res);
};

module.exports = { handleErrors };
