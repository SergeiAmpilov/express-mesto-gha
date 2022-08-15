const { celebrate, Joi } = require('celebrate');
const { regexVal } = require('../functions/validate-url');

const checkSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexVal),
  }),
});

module.exports = {
  checkSignIn, checkSignUp,
};
