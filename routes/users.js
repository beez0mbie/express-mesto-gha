const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
// роуты с параметрами лучше указывать после конкретных роутов,
// иначе мы идем по роуту и экпресс воспринимает его как параметр
router.get('/:userId', getUserById);

module.exports = router;
