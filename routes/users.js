const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');
const urlRegExp = require('../utils/urlRegExp');

const userIdKey = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp).required(),
  }),
}), updateUserAvatar);
// роуты с параметрами лучше указывать после конкретных роутов,
// иначе мы идем по роуту и экпресс воспринимает его как параметр
router.get('/:userId', celebrate(userIdKey), getUserById);

module.exports = router;
