const movieRoutes = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie, validateDeleteMovie } = require('../validator/validator');

movieRoutes.get('/', getAllMovies);
movieRoutes.post('/', validateCreateMovie, createMovie);
movieRoutes.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRoutes;
