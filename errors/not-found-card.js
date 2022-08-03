class NotFoundCard extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoFoundCard';
    this.statusCode = 404;
  }
}

module.exports = NotFoundCard;
