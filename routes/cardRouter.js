const cardRouter = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');
const { validateCardForm } = require('../middlewares/error');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', validateCardForm, postCard);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.put('/cards/:cardId/likes', putLike);

cardRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardRouter;
