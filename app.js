const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-user');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e80876d5d8a5b389541f6f',
  };

  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  try {
    throw new NotFoundError('Страница не найдена');
  } catch (err) {
    if (err.name === 'NoFoundUser') {
      res.status(404).send({ message: `Произошла ошибка ${err.message}` });
    }
  }
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {});
