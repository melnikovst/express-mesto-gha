const cardRouter = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');
const { validateCardForm, validateIds } = require('../middlewares/error');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', validateCardForm, postCard);

cardRouter.delete('/cards/:cardId', validateIds, deleteCard);

cardRouter.put('/cards/:cardId/likes', validateIds, putLike);

cardRouter.delete('/cards/:cardId/likes', validateIds, deleteLike);

module.exports = cardRouter;
