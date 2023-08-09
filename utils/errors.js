const handleCreateDbErrors = (err, res) => {
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
  return res.status(500).send('Server Error');
};

module.exports = handleCreateDbErrors;
