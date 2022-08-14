const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { COMMON_ERROR_CODE, DATA_ERROR_CODE } = require('../errors/error-codes');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      card.remove();
      res.status(200).send({ data: card, message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Не найдена карточка по указанному id' });
        return;
      }

      if (err.name === 'NoFoundError') {
        res.status(err.statusCode).send({ message: err.message });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('не найдена карточка с указанным id');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Не найдена карточка по указанному id' });
        return;
      }

      if (err.name === 'NoFoundError') {
        res.status(err.statusCode).send({ message: err.message });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('не найдена карточка с указанным id');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Не найдена карточка по указанному id' });
        return;
      }

      if (err.name === 'NoFoundError') {
        res.status(err.statusCode).send({ message: err.message });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};
