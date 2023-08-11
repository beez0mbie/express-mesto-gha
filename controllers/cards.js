const CardModel = require('../models/card');
const handleCreateDbErrors = require('../utils/errors');

const getCards = (req, res) => CardModel.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(`Server Error ${err.message}`));

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  CardModel.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      handleCreateDbErrors(err, res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndRemove(cardId).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  })
    .catch((err) => res.status(500).send(`Server Error ${err.message}`));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  }).catch((err) => res.status(500).send(`Server Error ${err.message}`));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  }).catch((err) => res.status(500).send(`Server Error ${err.message}`));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
