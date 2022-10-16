const User = require('../models/userModel');
const { fixDoubles } = require('../utils/utils');

module.exports.getProfiles = async (_, res) => {
  try {
    const response = await User.find({});
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.postProfile = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const response = await User.create({ name, about, avatar });
    res.send(response);
  } catch (error) {
    fixDoubles(res, error);
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    res.send(response);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ message: 'Пользователя с таким ID не существует' });
      return;
    }
    res.status(500).send({ message: 'Что-то пошло не так :(' });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, req.body, { new: true, runValidators: true });
    res.send(val);
  } catch (error) {
    fixDoubles(res, error);
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, req.body, { new: true, runValidators: true });
    res.send(val);
  } catch (error) {
    fixDoubles(res, error);
  }
};
