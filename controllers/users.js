const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const { COMMON_ERROR_CODE, DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE } = require('../errors/error-codes');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NoFoundError') {
        res.status(err.statusCode).send({ message: 'Произошла ошибка' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Не найден пользователь по указанному id' });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NoFoundError') {
        res.status(err.statusCode).send({ message: 'Произошла ошибка' });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Не найден пользователь по указанному id' });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NoFoundError') {
        res.status(err.statusCode).send({ message: 'Произошла ошибка' });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Не найден пользователь по указанному id' });
        return;
      }

      res.status(COMMON_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};
