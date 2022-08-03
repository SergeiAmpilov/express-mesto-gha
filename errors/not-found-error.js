class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
