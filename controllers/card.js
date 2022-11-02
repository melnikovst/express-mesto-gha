/* eslint-disable consistent-return */
const BadRequest = require('../customErrors/BadRequest');
const Forbidden = require('../customErrors/Forbidden');
const NotFound = require('../customErrors/NotFound');
const Card = require('../models/cardModel');

module.exports.getCards = async (_, res, next) => {
  try {
    const response = await Card.find({});
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports.postCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const response = await Card.findById(cardId);
    if (!response) {
      return next(new NotFound('Карточки с указанным ID не существует.'));
    }
    console.log(response.owner);
    console.log(req.user._id);
    if (response.owner.toString() !== req.user._id) {
      return next(new Forbidden('Чужое не трожь!'));
    }
    const deletedCard = await Card.findByIdAndDelete(cardId);
    res.send({ message: `Удалили карточку ${deletedCard.name}` });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequest('Карточка с указанным ID не найдена.'));
    }
    next(error);
  }
};

module.exports.putLike = async (req, res, next) => {
  try {
    const response = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!response) {
      throw new NotFound('Переданы некорректные данные для постановки/снятии лайка.');
    } else res.status(200).send(response);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequest('Карточка с указанным ID не найдена.'));
    }
    next(error);
  }
};

module.exports.deleteLike = async (req, res, next) => {
  console.log(req.params.cardId === '635cef2c45a2f35a69ebb0ba');
  try {
    const checkAvailibleCard = await Card.findById(req.params.cardId);
    if (!checkAvailibleCard) {
      throw new NotFound('Карточка не найдена');
    }
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.send(updatedCard);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequest('Валидация не пройдена, проверьте правильность введённых данных!'));
    }
    next(error);
  }
};
