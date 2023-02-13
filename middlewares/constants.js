const patternEmail = /([\w-.]{1,})@([\w-.]{1,}).(ru|com)/;
const patternUrl = /(https?:\/\/)(w{3}\.)?([\w\-.]{1,})\.(ru|com|net|co)(\/\w{1}([\w\-/]{1,}))?(\.[a-z]{2,4})?$/;
const secretKey = '123456';

const notFoundMessageUsers = 'Пользователь не найден';
const notFoundMessageMovies = 'Фильм не найден';
const notFoundMessagePage = 'Страница не найдена';
const unauthorizedCredentials = 'Неправильные почта или пароль';
const unauthorizedAuth = 'Необходимо авторизоваться';

module.exports = {
  secretKey,
  patternEmail,
  patternUrl,
  notFoundMessageUsers,
  notFoundMessageMovies,
  notFoundMessagePage,
  unauthorizedCredentials,
  unauthorizedAuth,
};
