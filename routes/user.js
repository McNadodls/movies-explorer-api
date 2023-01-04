const userRouter = require('express').Router();
const { getCurrentUser, updateUser } = require('../constrollers/user');
const { updateUserValidation } = require('../middlewares/validation');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidation, updateUser);

module.exports = userRouter;
