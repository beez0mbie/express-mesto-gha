const CardModel = require('../models/card');
const NotFoundError = require('../errors/notFound');
const AuthenticationError = require('../errors/authenticationError');

const getCards = (req, res, next) => CardModel.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  CardModel.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findById(cardId)
    .orFail(new NotFoundError('Карточки с таким ID не существует в базе'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new AuthenticationError('Нет прав удалить данную карточку');
      }
      return CardModel.deleteOne({ _id: cardId });
    })
    .then((card) => res.send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    {
      new: true,
    },
  ).orFail(new NotFoundError('Карточки с таким ID не существует в базе'))
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    {
      new: true,
    },
  ).orFail(new NotFoundError('Карточки с таким ID не существует в базе'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
