const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./router');

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
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {});
