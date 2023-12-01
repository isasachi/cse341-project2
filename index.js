const express = require('express');
const app = express();
const router = require('./routes/index');
const dbConnect = require('./database/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github').Strategy;
require('dotenv').config();
const PORT = process.env.PORT;
const URI = process.env.CONNECTION_URI;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors())
    .use('/', router);

passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Welcome to the Movies API<br>Logged out'));

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }), 
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

dbConnect(URI);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});