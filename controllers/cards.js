const CardModel = require('../models/card');
const { handleErrors } = require('../utils/errors');
const InvalidCardIdError = require('../errors/invalidCardId');

const getCards = (req, res) => CardModel.find({})
  .then((cards) => res.send(cards))
  .catch((err) => handleErrors(err, res));

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  CardModel.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => handleErrors(err, res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  CardModel.findByIdAndRemove(cardId)
    .orFail(new InvalidCardIdError())
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new InvalidCardIdError())
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new InvalidCardIdError())
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
