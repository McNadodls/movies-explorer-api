class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Неправильные данные';
  }
}

module.exports = BadRequest;
