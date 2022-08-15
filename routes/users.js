const router = require('express').Router();
const { checkUserId, checkUserUpdate, checkUserAvatar } = require('../middlewares/celebrate');

const {
  getUser, getAllUsers, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers); /* возвращает всех пользователей */
router.get('/me', getUserInfo); /* получить информацию о пользователей */
router.get('/:userId', checkUserId, getUser); /* возвращает пользователя по userId */
router.patch('/me', checkUserUpdate, updateUser); /* обновляет профиль */
router.patch('/me/avatar', checkUserAvatar, updateAvatar); /* обновляет аватар */

module.exports = router;
