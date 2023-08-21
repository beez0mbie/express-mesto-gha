const { Joi } = require('celebrate');
const urlRegExp = require('./urlRegExp');

const cardIdKey = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const postCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
};

const userIdKey = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const userPatch = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const userAvatarPatch = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp).required(),
  }),
};

const signUp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
  }),
};

const signIn = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),

  }),
};

module.exports = {
  cardIdKey,
  postCard,
  userIdKey,
  userPatch,
  userAvatarPatch,
  signUp,
  signIn,
};
