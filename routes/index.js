const router = require('express').Router();
const { errors } = require('celebrate');
const userRouter = require('./user');
const movieRouter = require('./movie');

const { createUser, login, signout } = require('../constrollers/user');
const { signupValidation, signinValidation } = require('../middlewares/validation');
const NotFound = require('../errors/NotFound');
const { notFoundMessagePage } = require('../middlewares/constants');
const auth = require('../middlewares/auth');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);


// защита auth
router.use(auth);
router.post('/signout', signout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(errors({
  message: 'Введены некорректные данные',
}));

router.use((req, res, next) => {
  next(new NotFound(notFoundMessagePage));
});

module.exports = router;
