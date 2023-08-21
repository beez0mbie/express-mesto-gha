const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const NotFoundError = require('../errors/notFound');
const AuthorizationError = require('../errors/authorizationError');
const getJwtSecretKey = require('../utils/getJwtSecretKey');

const login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .select('+password')
    .orFail(new AuthorizationError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthorizationError('Неправильные почта или пароль');
        }
        const token = jwt.sign(
          { _id: user._id },
          getJwtSecretKey(),
        );
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 365,
          httpOnly: true,
        }).send({ message: 'Всё верно! JWT отправлен' });
      }))
    .catch(next);
};

const getUsers = (req, res, next) => UserModel.find({})
  .then((users) => res.send(users))
  .catch(next);

const getUser = (req, res, next) => {
  const userId = req.user._id;
  UserModel.findById(userId)
    .orFail(new NotFoundError('Пользователя с таким ID не существует в базе'))
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .orFail(new NotFoundError('Пользователя с таким ID не существует в базе'))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => UserModel.create({ ...req.body, password: hash }))
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch(next);
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
      },
    ).orFail(new NotFoundError('Пользователя с таким ID не существует в базе'));
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  UserModel.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    {
      new: true,
    },
  ).orFail(new NotFoundError('Пользователя с таким ID не существует в базе'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
