const { SERVER_ERROR_MESSAGE } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500
        ? SERVER_ERROR_MESSAGE
        : message,
  });
  next();
};

module.exports = errorHandler;
