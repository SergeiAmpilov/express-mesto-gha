const Card = require('../models/cards');

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;

  Card.create({name, link, req.user._id})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
  .then((cards) => res.send(cards))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.delete(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

