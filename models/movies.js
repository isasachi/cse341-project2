const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    released: String,
    rated: String,
    genre: String,
    director: String,
    actors: String,
    poster: String
});

module.exports = mongoose.model('Movies', movieSchema);