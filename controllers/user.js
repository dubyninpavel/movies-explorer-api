const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/config');
const BadRequestError = require('../middlewares/errors/badRequestError');
const ConflictError = require('../middlewares/errors/conflictError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const UnauthorizedError = require('../middlewares/errors/unauthorizedError');
const {
  BAD_REQUEST_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  VALIDATION_ERROR,
  LOG_OUT_MESSAGE,
} = require('../constants/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name, email, password: hashedPassword,
      })
        .then((user) => {
          res.send({ data: user.hiddenPassword() });
        })
        .catch((err) => {
          if (err.name === VALIDATION_ERROR) {
            next(new BadRequestError(`${err}. ${BAD_REQUEST_ERROR_MESSAGE}`));
          } else if (err.code === 11000) {
            next(new ConflictError(CONFLICT_ERROR_MESSAGE));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INCORRECT_DATA_MESSAGE);
      }
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              JWT_SECRET,
              {
                expiresIn: '7d',
              },
            );
            res.send({ data: user.hiddenPassword(), token });
          } else {
            next(new UnauthorizedError(INCORRECT_DATA_MESSAGE));
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const logOutUser = (req, res) => {
  res.clearCookie('jwt').send({ message: LOG_OUT_MESSAGE });
};

const getMyUserData = (req, res, next) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const findUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { name, email } },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      }
      next(err);
    });
};

const updateDataUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((isUser) => {
      if (isUser) {
        if (isUser.id === req.user._id) {
          findUser(req, res, next);
        } else {
          next(new ConflictError(CONFLICT_ERROR_MESSAGE));
        }
      } else {
        findUser(req, res, next);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  loginUser,
  logOutUser,
  getMyUserData,
  updateDataUser,
};
