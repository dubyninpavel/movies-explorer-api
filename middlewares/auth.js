const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorizedError');
const { JWT_SECRET } = require('../config/config');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../constants/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
