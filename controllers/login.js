/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Unauthorized = require('../customErrors/Unauthorized');
const BadRequest = require('../customErrors/BadRequest');
const User = require('../models/userModel');

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const test = await User.findOne({ email }).select('+password');
    if (!test) {
      return Promise.reject(new Error('Неправильный адрес электронной почты или неверный пароль'));
    }
    const matched = await bcrypt.compare(password, test.password);
    console.log(matched);
    console.log(test);
    if (!matched) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    const key = jwt.sign({ _id: test._id }, '6360540f025b93cbcf82932d', {
      expiresIn: '7d',
    });
    res.cookie('jwt', key, {
      maxAge: 7777777,
      httpOnly: true,
    }).send({ message: 'Залогинились успешно)' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest('Ужасный запрос, проверьте введённые данные'));
    }
    next(new Unauthorized(error.message));
  }
};
