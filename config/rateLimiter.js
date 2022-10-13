const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
});

module.exports = apiLimiter;
