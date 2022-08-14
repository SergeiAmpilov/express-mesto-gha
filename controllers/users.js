const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
// const BadUserError = require('../errors/bad-user-error');
const {
  COMMON_ERROR_CODE, DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE, MONGO_ERROR_CODE,
} = require('../errors/error-codes');

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'MongoServerError') {
        res.status(MONGO_ERROR_CODE).send({ message: 'Ошибка базы данных' });
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, { maxAge: 3600000, httpOnly: true })
        .end();
    })
    .catch((err) => res.status(err.statusCode).send({ message: err.message }));
};

module.exports.getUserInfo = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с id не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Не найден пользователь' });
      }
    });
};
