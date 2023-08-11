const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connected to ${MONGODB_URL}`);
  })
  .catch(
    (err) => new Error(`Impossible connect to DB ${err.name}: ${err.message}`),
  );

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64d238466b090919cc7f2cf9', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
