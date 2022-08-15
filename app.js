const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const auth = require('./middlewares/auth');
const { checkSignIn, checkSignUp } = require('./middlewares/celebrate');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', checkSignIn, login);
app.post('/signup', checkSignUp, createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => {
  try {
    throw new NotFoundError('Страница не найдена');
  } catch (err) {
    next(err);
  }
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errors()); // обработчик ошибок celebrate

// здесь обрабатываем все ошибки
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : `Произошла ошибка ${message}`,
  });
  return next;
});

app.listen(PORT, () => {});
