const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;
const { secretKey, unauthorizedAuth } = require('./constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized(unauthorizedAuth));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    next(new Unauthorized(unauthorizedAuth));
    return;
  }

  req.user = payload;
  next();
};
