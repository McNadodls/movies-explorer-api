const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;
const { secretKey, notFoundMessageUsers } = require('../middlewares/constants');
// ошибки
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound(notFoundMessageUsers);
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict());
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

// login и auth
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, { expiresIn: '7d' }); // Создаем токен
    
    const userObj = user.toObject();
    userObj["token"] = token;
    delete userObj.password;
    res.send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict());
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserCredentials(email, password) // кастомный метод
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, { expiresIn: '7d' }); // Создаем токен
    
    const userObj = user.toObject();
    userObj["token"] = token;
    delete userObj.password;
    res.send(userObj);
  })
  .catch(next);
};

module.exports.signout = (req, res) => {
  // res.setHeader('Set-Cookie', [`jwt=null;  Path=/;HttpOnly; maxAge=0;SameSite=None;Secure=true;`]);
  // res.cookie('jwt', '', {
  //   maxAge: 0,
  //   httpOnly: true,
  // });
  res.send({ message: 'Complete' });
};
