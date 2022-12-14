const Movie = require('../models/movie');
const BadRequestError = require('../middlewares/errors/badRequestError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const ForbiddenError = require('../middlewares/errors/forbiddenError');
const {
  BAD_REQUEST_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  VALIDATION_ERROR,
  CAST_ERROR,
  DELETED_DATA,
} = require('../constants/constants');

const getMyMovies = (req, res, next) => {
  const id = req.user._id;
  Movie.find({ owner: id })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((newMovie) => {
      res.send({ data: newMovie });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(`${err}. ${BAD_REQUEST_ERROR_MESSAGE}`));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById({
    _id: `${movieId}`,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_CARD_MESSAGE);
      }
      if (!(movie.owner.toString() === _id)) {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
      Movie.findByIdAndDelete({ _id: `${movieId}` })
        .then((item) => {
          res.send({ message: DELETED_DATA, item });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      }
      next(err);
    });
};

module.exports = { getMyMovies, createMovie, deleteMovie };
