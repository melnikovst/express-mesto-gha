require('dotenv').config();

const {
  NODE_ENV = 'develop',
  PORT = 3000,
  JWT_SECRET,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  PORT,
};
