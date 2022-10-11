const cardRouter = require('express').Router();
const Card = require('../models/cardModel');

cardRouter.get('/cards', (_, res) => {
  Card.find({}).then((val) => res.send(val));
});

cardRouter.post('/cards', (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card));
});

cardRouter.delete('/cards/:cardId', (req, res) => {
  console.log(req.params);
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId).then((val) => res.send(val));
});

cardRouter.put('/cards/:cardId/likes', (req, res) => {
  console.log(req.user._id);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((val) => res.send(val));
});

cardRouter.delete('/cards/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((val) => res.send(val));
});

module.exports = cardRouter;
