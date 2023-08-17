const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');

const userIdKey = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
};

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
// роуты с параметрами лучше указывать после конкретных роутов,
// иначе мы идем по роуту и экпресс воспринимает его как параметр
router.get('/:userId', celebrate(userIdKey), getUserById);

module.exports = router;
