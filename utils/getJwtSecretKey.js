require('dotenv').config();

const { NODE_ENV = 'production', JWT_SECRET = 'production_secret', JWT_DEV = 'dev_secret' } = process.env;

const getJwtSecretKey = () => (NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);

module.exports = getJwtSecretKey;
