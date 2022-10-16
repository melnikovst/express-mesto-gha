const cardRouter = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', postCard);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.put('/cards/:cardId/likes', putLike);

cardRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardRouter;
