const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const DataError = require('../errors/data-error');
const BadUserError = require('../errors/bad-user-error');

module.exports.createUser = (req, res, next) => {
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
        next(new DataError('Переданы некорректные данные'));
      }

      if (err.name === 'MongoServerError') {
        next(new BadUserError('Ошибка базы данных'));
      }

      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NoFoundError') {
        next(new NotFoundError('Произошла ошибка'));
      }

      if (err.name === 'CastError') {
        next(new DataError('Не найден пользователь по указанному id'));
      }

      next(err);
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NoFoundError') {
        next(new NotFoundError('Не найден пользователь'));
      }

      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные'));
      }

      if (err.name === 'CastError') {
        next(new NotFoundError('Не найден пользователь по указанному id'));
      }

      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NoFoundError') {
        next(new NotFoundError('Произошла ошибка'));
      }

      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные'));
      }

      if (err.name === 'CastError') {
        next(new NotFoundError('Не найден пользователь по указанному id'));
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, { maxAge: 3600000, httpOnly: true })
        .end();
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
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
        next(new NotFoundError('Не найден пользователь по указанному id'));
      }

      next(err);
    });
};
