class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Такой пользователь уже существует';
  }
}
module.exports = Conflict;
