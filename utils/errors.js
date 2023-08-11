const handle500Error = (err, res) => res.status(500).send({ message: `Server Error ${err.message}` });

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    const message = err.errors ? `${Object.values(err.errors).map((error) => error.message).join(', ')}` : `Server Error ${err.name}: ${err.message}`;
    return res.status(400).send({
      message,
    });
  }
  return handle500Error(err, res);
};

module.exports = { handle500Error, handleErrors };
