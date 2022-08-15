const { EXIST_ERROR_CODE } = require('./error-codes');

class ExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExistError';
    this.statusCode = EXIST_ERROR_CODE;
  }
}

module.exports = ExistError;
