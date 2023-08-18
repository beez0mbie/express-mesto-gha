const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const urlRegExp = require('../utils/urlRegExp');

const cardIdKey = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
};

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
}), createCard);
router.delete('/:cardId', celebrate(cardIdKey), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdKey), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdKey), dislikeCard);

module.exports = router;
