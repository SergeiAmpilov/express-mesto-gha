const jwt = require('jsonwebtoken');
const BadUserError = require('../errors/bad-user-error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new BadUserError('Необходима авторизация.');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация.' });

    next(new BadUserError('Необходима авторизация..'));
    // throw new BadUserError('Необходима авторизация.');
  }
  req.user = payload;
  next();
  return true;
};
