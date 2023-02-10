const movieRouter = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../constrollers/movie');
const { createMovieValidation, idValidation } = require('../middlewares/validation');

movieRouter.get('/', getSavedMovies);
movieRouter.patch('/', createMovieValidation, createMovie);
movieRouter.delete('/:id', idValidation, deleteMovie);

module.exports = movieRouter;
