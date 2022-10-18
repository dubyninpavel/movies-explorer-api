const movieRoutes = require('express').Router();
const { getMyMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie, validateDeleteMovie } = require('../validator/validator');

movieRoutes.get('/', getMyMovies);
movieRoutes.post('/', validateCreateMovie, createMovie);
movieRoutes.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRoutes;
