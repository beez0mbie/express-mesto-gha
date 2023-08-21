require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
  NODE_ENV = 'production',
  JWT_SECRET = 'production_secret',
  JWT_DEV = 'dev_secret',
} = process.env;

module.exports = {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  JWT_SECRET,
  JWT_DEV,
};
