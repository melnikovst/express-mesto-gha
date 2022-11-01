const cardRouter = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');
const { validateCardForm, validateCardIds } = require('../middlewares/error');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', validateCardForm, postCard);

cardRouter.delete('/cards/:cardId', validateCardIds, deleteCard);

cardRouter.put('/cards/:cardId/likes', validateCardIds, putLike);

cardRouter.delete('/cards/:cardId/likes', validateCardIds, deleteLike);

module.exports = cardRouter;
