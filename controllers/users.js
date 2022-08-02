const User = require('../models/user');

const NotFoundUser = require('../errors/not-found-user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundUser('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'NoFoundUser') {
        res.status(404).send({ message: `Произошла ошибка ${err.message}` });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не найден пользователь по указанному id' });
        return;
      }

      res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Не найден пользователь по указанному id' });
        return;
      }

      res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Не найден пользователь по указанному id' });
        return;
      }

      res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};
