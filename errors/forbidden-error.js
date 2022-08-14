const { FORBIDDEN_ERROR_CODE } = require('./error-codes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = ForbiddenError;
