const router = require('express').Router();

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', createCard); /* создаёт карточку */
router.get('/', getCards); /* возвращает все карточки */
router.delete('/:cardId', deleteCard); /* удаляет карточку по идентификатору */
router.put('/:cardId/likes', likeCard); /* поставить лайк карточке */
router.delete('/:cardId/likes', dislikeCard); /* убрать лайк с карточки */

module.exports = router;
