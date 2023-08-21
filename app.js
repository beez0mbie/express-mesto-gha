require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./utils/errors');
const urlRegExp = require('./utils/urlRegExp');

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

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),

  }),
}), login);
app.use(auth);
app.use(router);
app.use(errors());
// eslint-disable-next-line no-unused-vars, max-len
app.use((err, _req, res, _next) => { // _next обязательно нужно указать 4 параметр что бы ошибки заработали
  handleErrors(err, res);
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
