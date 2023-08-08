const UserModel = require('../models/user');

const getUsers = (req, res) => UserModel.find({}).then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(`Server Error ${err.message}`));

const getUserById = (req, res) => {
  const { userId } = req.params;
  return UserModel.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(user);
  })
    .catch((err) => res.status(500).send(`Server Error ${err.message}`));
};

const createUser = (req, res) => UserModel.create({ ...req.body })
  .then((user) => res.status(201).send(user))
  .catch((err) => {
    console.log(err);
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
  });

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
