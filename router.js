const router = require('express').Router();

const { getUser, createUser, getAllUsers, updateUser, updateAvatar } = require('./controllers/users');
const { createCard, getCards, deleteCard } = require('./controllers/cards');

router.get('/users/:userId', getUser); /* возвращает пользователя по userId */
router.get('/users', getAllUsers); /* возвращает всех пользователей */
router.post('/users', createUser); /* создаёт пользователя */
router.patch('/users/me', updateUser); /* обновляет профиль */
router.patch('/users/me/avatar', updateAvatar); /* обновляет аватар */

router.post('/cards', createCard); /* создаёт карточку */
router.get('/cards', getCards); /* возвращает все карточки */
router.delete('/cards/:cardId', deleteCard); /* удаляет карточку по идентификатору */

module.exports = router;
