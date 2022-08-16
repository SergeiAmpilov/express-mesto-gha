const { celebrate, Joi } = require('celebrate');
const { regexVal, checkIsCorrectId } = require('../functions/validate-url');

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

const checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(checkIsCorrectId, 'custom id validation'),
  }).messages({
    'invalid.id': 'Некорректный id пользователя',
  }),
});

const checkUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const checkUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexVal),
  }),
});

const checkCardPost = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexVal),
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(checkIsCorrectId, 'custom id validation'),
  }).messages({
    'invalid.id': 'Некорректный id карточки',
  }),
});

module.exports = {
  checkSignIn,
  checkSignUp,
  checkUserId,
  checkUserUpdate,
  checkUserAvatar,
  checkCardPost,
  checkCardId,
};
