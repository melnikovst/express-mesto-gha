const crypt = require('bcryptjs');
const BadRequest = require('../customErrors/BadRequest');

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
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await crypt.hash(password, 5);
    const response = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    res.send(response);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    if (!response) {
      res.status(404).send({ message: 'Валидация не пройдена, проверьте правильность введённых данных!' });
      return;
    }
    res.send(response);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequest('Пользователя с таким ID не существует'));
    }
    next(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, req.body, { new: true, runValidators: true });
    res.send(val);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, req.body, { new: true, runValidators: true });
    res.send(val);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};

module.exports.me = async (req, res, next) => {
  const owner = req.user._id;
  console.log(req.user);
  try {
    const me = await User.findOne(owner);
    res.send(me);
  } catch (error) {
    next(error);
  }
};
