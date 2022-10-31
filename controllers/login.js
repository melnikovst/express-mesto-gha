/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Unauthorized = require('../customErrors/Unauthorized');
const User = require('../models/userModel');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильный адрес электронной почты или неверный пароль'));
    }
    return bcrypt.compare(password, user.password);
  }).then((matched) => {
    if (!matched) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    const key = jwt.sign({ _id: User._id }, 'super strong secret key', {
      expiresIn: '7d',
    });
    console.log(key);
    res.cookie('jwt', key, {
      maxAge: 7777777,
      httpOnly: true,
    }).send({ message: 'Залогинились успешно)' });
  })
    .catch((err) => {
      /* res
        .status(401)
        .send({ message: err.message }); */
      next(new Unauthorized(err.message));
    });
};
