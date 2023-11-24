const express = require('express');
const router = express.Router();
const movies = require('./movies');

router.get('/', (req, res) => {
    res.send('Welcome to the Movies API');
});

router.use('/movies', movies);

module.exports = router;