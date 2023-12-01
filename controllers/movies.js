const Movies = require('../models/movies');
const ObjectId = require('mongoose').Types.ObjectId;

async function getAllMovies(req, res) {
    try {
        const movies = await Movies.find({});
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
    }
};

async function getSingleMovie(req, res) {
    try {
        const id = new ObjectId(req.params.id)
        const movie = await Movies.findOne({ _id: id })
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
    }
};

async function createNewMovie(req, res) {
    try {
        const data = {
            name: req.body.name,
            released: req.body.released,
            rated: req.body.rated,
            genre: req.body.genre,
            director: req.body.director,
            actors: req.body.actors,
            poster: req.body.poster
        }
        const movie = await Movies.create(data);
        res.status(204).send();
    } catch (error) {
         console.error(error);
    }
};

async function updateMovie(req, res) {
    const id = new ObjectId(req.params.id)
    const data = {
        name: req.body.name,
        released: req.body.released,
        rated: req.body.rated,
        genre: req.body.genre,
        director: req.body.director,
        actors: req.body.actors,
        poster: req.body.poster
    }
    const movie = await Movies.replaceOne({ _id: id }, data)
    if (movie.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(movie.error);
        console.log(movie.error);
    }
};

async function deleteMovie(req, res) {
    const id = new ObjectId(req.params.id)
    const movie = await Movies.deleteOne({ _id: id });
    if (movie.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(movie.error);
        console.log(movie.error);
    };
};

module.exports = {
    getAllMovies,
    getSingleMovie,
    createNewMovie,
    updateMovie,
    deleteMovie
};