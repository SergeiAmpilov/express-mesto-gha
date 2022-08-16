const NotFoundError = require('../errors/not-found-error');

module.exports.processError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : `Произошла ошибка ${message}`,
  });
  next();
};

module.exports.notFoundRequest = (req, res, next) => next(new NotFoundError('Страница не найдена'));
