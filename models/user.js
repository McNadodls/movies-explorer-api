const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');
const { patternEmail, unauthorizedCredentials } = require('../middlewares/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: patternEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// кастомный метод поиска юзера для singin
userSchema.statics.findUserCredentials = function findUserCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(unauthorizedCredentials));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(unauthorizedCredentials));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
