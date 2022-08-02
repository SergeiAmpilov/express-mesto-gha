const router = require('express').Router();

const {
  getUser, createUser, getAllUsers, updateUser, updateAvatar,
} = require('./controllers/users');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('./controllers/cards');

router.get('/users/:userId', getUser); /* возвращает пользователя по userId */
router.get('/users', getAllUsers); /* возвращает всех пользователей */
router.post('/users', createUser); /* создаёт пользователя */
router.patch('/users/me', updateUser); /* обновляет профиль */
router.patch('/users/me/avatar', updateAvatar); /* обновляет аватар */

router.post('/cards', createCard); /* создаёт карточку */
router.get('/cards', getCards); /* возвращает все карточки */
router.delete('/cards/:cardId', deleteCard); /* удаляет карточку по идентификатору */
router.put('/cards/:cardId/likes', likeCard); /* поставить лайк карточке */
router.delete('/cards/:cardId/likes', dislikeCard); /* убрать лайк с карточки */

module.exports = router;
