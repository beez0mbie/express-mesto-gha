const UserModel = require('../models/user');
const { handleErrors } = require('../utils/errors');
const InvalidUserIdError = require('../errors/invalidUserId');

const getUsers = (req, res) => UserModel.find({})
  .then((users) => res.send(users))
  .catch((err) => res.status(500).send(`Server Error ${err.message}`));

const getUserById = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .orFail(new InvalidUserIdError())
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

const createUser = (req, res) => UserModel.create({ ...req.body })
  .then((user) => res.status(201).send(user))
  .catch((err) => handleErrors(err, res));

const updateUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(new InvalidUserIdError());
    return res.send(updatedUser);
  } catch (err) {
    return handleErrors(err, res);
  }
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  UserModel.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new InvalidUserIdError())
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
