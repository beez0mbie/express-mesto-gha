const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');
const { userIdKey, userPatch, userAvatarPatch } = require('../utils/routerValidations');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', celebrate(userPatch), updateUser);
router.patch('/me/avatar', celebrate(userAvatarPatch), updateUserAvatar);
// роуты с параметрами лучше указывать после конкретных роутов,
// иначе мы идем по роуту и экпресс воспринимает его как параметр
router.get('/:userId', celebrate(userIdKey), getUserById);

module.exports = router;
