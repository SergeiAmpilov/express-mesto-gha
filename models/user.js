const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/not-found-error');
const BadUserError = require('../errors/bad-user-error');
const regexVal = require('../functions/validate-url');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Too short Name. Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Too long Name. Must be max 30, got {VALUE}'],
    defaulf: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Too short About. Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Too long About. Must be max 30, got {VALUE}'],
    defaulf: 'Исследователь',
  },
  avatar: {
    type: String,
    defaulf: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // validate: [validateUrl, 'Enter correct url'],
    validate: {
      validator: regexVal.test,
      message: 'Введите корректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Enter correct email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadUserError('Неверный емайл или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
