class NotFoundUser extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoFoundUser';
    this.statusCode = 404;
  }
}

module.exports = NotFoundUser;
