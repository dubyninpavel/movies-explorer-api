/* eslint-disable consistent-return */
const Movie = require('../models/movie');
const BadRequestError = require('../middlewares/errors/badRequestError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const ForbiddenError = require('../middlewares/errors/forbiddenError');

const getAllMovies = (req, res, next) => {
    Movie.find({})
        .then((cards) => {
            res.send({ data: cards });
        })
        .catch((err) => {
            next(err);
        });
};

const createMovie = (req, res, next) => {
    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        trumbnail,
        movieId,
        nameRU,
        nameEN,
    } = req.body;
    const owner = req.user._id;
    Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        trumbnail,
        owner,
        movieId,
        nameRU,
        nameEN,
    })
        .then((newMovie) => {
            res.send({ data: newMovie });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return next(new BadRequestError(`${err}. Переданы некорректные данные в методы создания фильма`));
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
                throw new NotFoundError('Карточка по указанному id не найдена');
            }
            if (!(movie.owner.toString() === _id)) {
                throw new ForbiddenError('У вас нет прав на удаление этой карточки');
            }
            Movie.findByIdAndDelete({ _id: `${movieId}` })
                .then((item) => {
                    res.send({ message: 'Данные удалены', item });
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Некорректный запрос'));
            }
            next(err);
        });
};

module.exports = { getAllMovies, createMovie, deleteMovie };
