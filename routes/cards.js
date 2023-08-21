const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardIdKey, postCard } = require('../utils/routerValidations');

router.get('/', getCards);
router.post('/', celebrate(postCard), createCard);
router.delete('/:cardId', celebrate(cardIdKey), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdKey), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdKey), dislikeCard);

module.exports = router;
