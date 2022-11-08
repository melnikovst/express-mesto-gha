/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequest = require('../customErrors/BadRequest');
const NotFound = require('../customErrors/NotFound');
const UniqueError = require('../customErrors/UniqueError');

const { JWT_SECRET, NODE_ENV } = process.env;

const User = require('../models/userModel');

module.exports.getProfiles = async (_, res, next) => {
  try {
    const response = await User.find({});
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports.postProfile = async (req, res, next) => {
  const {
    name, about, avatar, email, password, _id,
  } = req.body;
  try {
    const hashedPassword = await crypt.hash(password, 5);
    const response = await User.create({
      _id, name, about, avatar, email, password: hashedPassword,
    });
    const key = jwt.sign({ _id: response._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });
    res.cookie('jwt', key, {
      maxAge: 7777777,
      httpOnly: true,
    }).send(response);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    if (error.code === 11000) {
      return next(new UniqueError('Валидация не пройдена, поле email должно быть уникальным.'));
    }
    next(error);
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    if (!response) {
      return next(new NotFound('Ничего не найдено :('));
    }
    res.send(response);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequest('Пользователя с таким ID не существует'));
    }
    next(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = { name: req.body.name, about: req.body.about };
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, user, { new: true, runValidators: true });
    res.send(val);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const avatar = { avatar: req.body.avatar };
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true });
    res.send(val);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};

module.exports.me = async (req, res, next) => {
  try {
    const me = await User.findOne({ _id: req.user._id });
    const key = jwt.sign({ _id: me._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });
    res.cookie('jwt', key, {
      maxAge: 7777777,
      httpOnly: true,
    }).send(me);
  } catch (error) {
    next(error);
  }
};
