const router = require('express').Router();

const {
  getUser, createUser, getAllUsers, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/:userId', getUser); /* возвращает пользователя по userId */
router.get('/', getAllUsers); /* возвращает всех пользователей */
router.post('/', createUser); /* создаёт пользователя */
router.patch('/me', updateUser); /* обновляет профиль */
router.patch('/me/avatar', updateAvatar); /* обновляет аватар */

module.exports = router;
