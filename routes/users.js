const router = require('express').Router();

const {
  getUser, getAllUsers, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers); /* возвращает всех пользователей */
router.get('/me', getUserInfo); /* получить информацию о пользователей */
router.get('/:userId', getUser); /* возвращает пользователя по userId */
router.patch('/me', updateUser); /* обновляет профиль */
router.patch('/me/avatar', updateAvatar); /* обновляет аватар */

module.exports = router;
