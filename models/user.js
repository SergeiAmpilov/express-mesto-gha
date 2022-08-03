const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Too short Name. Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Too long Name. Must be max 30, got {VALUE}'],
  },
  about: {
    type: String,
    required: [true, 'About is required'],
    minlength: [2, 'Too short About. Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Too long About. Must be max 30, got {VALUE}'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar is required'],
  },
});

module.exports = mongoose.model('user', userSchema);
