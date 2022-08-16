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
const { processError } = require('./middlewares/error');

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
app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errors()); // обработчик ошибок celebrate
app.use(processError);

app.listen(PORT, () => {});
