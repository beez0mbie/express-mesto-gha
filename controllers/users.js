const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { handleErrors } = require('../utils/errors');
const InvalidUserIdError = require('../errors/invalidUserId');
const InvalidEmailOrPassword = require('../errors/invalidEmailOrPassword');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .orFail(new InvalidEmailOrPassword())
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new InvalidEmailOrPassword();
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        );
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 365,
          httpOnly: true,
        }).send({ message: 'Всё верно! JWT отправлен' });
      }))
    .catch((err) => handleErrors(err, res));
};

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

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => UserModel.create({ ...req.body, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => handleErrors(err, res));
};

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
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
