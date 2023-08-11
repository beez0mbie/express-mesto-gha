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

const updateUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name: req.body.name, about: req.body.about },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  UserModel.findByIdAndUpdate(userId, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(`Server Error ${err.message}`));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
