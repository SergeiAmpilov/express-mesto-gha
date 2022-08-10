const mongoose = require('mongoose');
const validator = require('validator');

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
    validate: [validator.isURL, 'Enter correct url'],
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
  },
});

module.exports = mongoose.model('user', userSchema);
