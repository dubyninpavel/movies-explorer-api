const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorizedError');
const { JWT_SECRET } = require('../config/config');

const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next(new UnauthorizedError('Необходимо авторизироваться'));
    }
    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return next(new UnauthorizedError('Необходимо авторизироваться'));
    }
    req.user = payload;
    return next();
};

module.exports = auth;
