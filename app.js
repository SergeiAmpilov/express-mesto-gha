const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const { PORT = 3000 } = process.env;

const app = express();
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  // пока ничего не делаем
});
