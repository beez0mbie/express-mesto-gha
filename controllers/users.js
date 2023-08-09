const UserModel = require('../models/user');
const handleCreateDbErrors = require('../utils/errors');

const getUsers = (req, res) => UserModel.find({})
  .then((users) => res.status(200).send(users))
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
    handleCreateDbErrors(err, res);
  });

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
