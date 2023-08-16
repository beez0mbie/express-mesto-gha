require('dotenv').config();

const { NODE_ENV, JWT_SECRET, JWT_DEV } = process.env;

const getJwtSecretKey = () => (NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);

module.exports = getJwtSecretKey;
