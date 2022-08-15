const router = require('express').Router();

const { checkCardPost, checkCardId } = require('../middlewares/celebrate');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', checkCardPost, createCard); /* создаёт карточку */
router.get('/', getCards); /* возвращает все карточки */
router.delete('/:cardId', checkCardId, deleteCard); /* удаляет карточку по идентификатору */
router.put('/:cardId/likes', checkCardId, likeCard); /* поставить лайк карточке */
router.delete('/:cardId/likes', checkCardId, dislikeCard); /* убрать лайк с карточки */

module.exports = router;
