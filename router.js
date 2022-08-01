const router = require('express').Router();

const { getUser, createUser, getAllUsers } = require('./controllers/users');

router.get('/', (req, res) => {
  res.send('Hello world');
}); /* debug */

router.get('/users/:userId', getUser); /* возвращает пользователя по userId */
router.get('/users', getAllUsers); /* возвращает всех пользователей */
router.post('/users', createUser); /* создаёт пользователя */

module.exports = router;
