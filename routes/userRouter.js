const userRouter = require('express').Router();
const User = require('../models/userModel');
const { validateErrors } = require('../utils/utils.js');

userRouter.get('/users', (_, res) => {
  User.find({}).then((val) => {
    throw new Error;
    res.send(val);
  }).catch((err) => {
    console.log('САМА ОШИБКА ' + Error)
    console.log('ОШИБКА ' + err);
    console.log('ТИП ОШИБКИ ' + typeof err);
    console.log('МЕССАГА ' + err.message);
    console.log('ИМЯ ' + err.name);
  });
});

userRouter.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((val) => res.send(val));
});

userRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id).then((val) => res.send(val));
});

userRouter.patch('/users/me', (req, res) => {
  const owner = req.user._id;
  console.log('owner ' + owner);
  console.log(req.body);
  console.log(User);
  User.findByIdAndUpdate('6342ec049e063b68d7526c9c', req.body, { new: true }).then((val) => res.send(val));
});

userRouter.patch('/users/me/avatar', (req, res) => {
  User.findByIdAndUpdate('6342ec049e063b68d7526c9c', req.body, { new: true }).then((val) => res.send(val));
});

module.exports = userRouter;
