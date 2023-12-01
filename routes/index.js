const express = require('express');
const router = express.Router();
const movies = require('./movies');
const swagger = require('./swagger');
const passport = require('passport');

router.use('/', swagger);

router.use('/movies', movies);

router.get('/login', passport.authenticate('github'));

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});

module.exports = router;