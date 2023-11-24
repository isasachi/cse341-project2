const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies')

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', moviesController.createNewMovie);

module.exports = router;