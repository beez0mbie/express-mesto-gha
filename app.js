require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./utils/errors');
const { signUp, signIn } = require('./utils/routerValidations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGODB_URL } = require('./env');

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
app.use(requestLogger);

app.post('/signup', celebrate(signUp), createUser);
app.post('/signin', celebrate(signIn), login);
app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars, max-len
app.use((err, _req, res, _next) => {
  // _next обязательно нужно указать 4 параметр что бы ошибки заработали
  handleErrors(err, res);
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
