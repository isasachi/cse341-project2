const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies')
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', isAuthenticated, moviesController.createNewMovie);
router.put('/:id', isAuthenticated, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;