const Card = require('../models/cardModel');
const { fixDoubles, fixLikesDoubles } = require('../utils/utils');

module.exports.getCards = async (_, res) => {
  try {
    const response = await Card.find({});
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.postCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.send(card);
  } catch (error) {
    fixDoubles(res, error);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const response = await Card.findByIdAndDelete(cardId);
    if (!response) {
      res
        .status(404)
        .send({ message: 'Карточки с указанным ID не существует.' });
      return;
    }
    res.send(response);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Карточка с указанным ID не найдена.' });
    }
    res.status(500).send({ message: 'Что-то пошло не так :(' });
  }
};

module.exports.putLike = async (req, res) => {
  try {
    const response = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!response) {
      res
        .status(404)
        .send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      return;
    }
    res.send(response);
  } catch (error) {
    fixLikesDoubles(res, error);
  }
};

module.exports.deleteLike = async (req, res) => {
  try {
    const response = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!response) {
      res
        .status(404)
        .send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      return;
    }
    res.send(response);
  } catch (error) {
    fixLikesDoubles(res, error);
  }
};
