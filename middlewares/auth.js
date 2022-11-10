require('dotenv').config();
const token = require('jsonwebtoken');
const Unauthorized = require('../customErrors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;
console.log(NODE_ENV, JWT_SECRET);

// eslint-disable-next-line consistent-return
module.exports.ver = (req, _, next) => {
  console.log(`${NODE_ENV} ауф`);
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  let payload;

  try {
    payload = token.verify(jwt, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
