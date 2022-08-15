const { DATA_ERROR_CODE } = require('./error-codes');

class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataError';
    this.statusCode = DATA_ERROR_CODE;
  }
}

module.exports = DataError;
