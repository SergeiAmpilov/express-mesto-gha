const router = require('express').Router();

const {
  getUser, createUser, getAllUsers, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUser); /* возвращает пользователя по userId */
router.get('/users', getAllUsers); /* возвращает всех пользователей */
router.post('/users', createUser); /* создаёт пользователя */
router.patch('/users/me', updateUser); /* обновляет профиль */
router.patch('/users/me/avatar', updateAvatar); /* обновляет аватар */

module.exports = router;
