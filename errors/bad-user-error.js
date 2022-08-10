const { MONGO_ERROR_CODE } = require('./error-codes');

class BadUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadUserError';
    this.statusCode = MONGO_ERROR_CODE;
  }
}

module.exports = BadUserError;
