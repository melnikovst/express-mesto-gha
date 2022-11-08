const token = require('jsonwebtoken');
const Unauthorized = require('../customErrors/Unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
module.exports.ver = (req, _, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  let payload;

  try {
    payload = token.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
