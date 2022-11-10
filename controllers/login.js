/* eslint-disable consistent-return */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Unauthorized = require('../customErrors/Unauthorized');
const User = require('../models/userModel');

const { NODE_ENV, JWT_SECRET } = process.env;
console.log(NODE_ENV, JWT_SECRET);

module.exports.login = async (req, res, next) => {
  console.log(`${NODE_ENV} логин`);
  const { email, password } = req.body;
  try {
    const test = await User.findOne({ email }).select('+password');
    if (!test) {
      return next(new Unauthorized('Неправильный адрес электронной почты или неверный пароль'));
    }
    const matched = await bcrypt.compare(password, test.password);
    if (!matched) {
      return next(new Unauthorized('Неправильные почта или пароль'));
    }
    const key = jwt.sign({ _id: test._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });
    res.cookie('jwt', key, {
      sameSite: 'None',
      secure: true,
      maxAge: 7777777,
      httpOnly: true,
    }).send({ message: 'Залогинились успешно)' });
  } catch (error) {
    next(error);
  }
};
