const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/notFound');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Resource not found'));
});

module.exports = router;
