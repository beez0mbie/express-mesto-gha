const handle500Error = (err, res) => res.status(500).send({ message: `Server Error ${err.message}` });

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`,
    });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({
      message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`,
    });
  }
  return handle500Error(err, res);
};

module.exports = { handle500Error, handleErrors };
