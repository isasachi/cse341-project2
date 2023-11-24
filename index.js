const express = require('express');
const app = express();
const router = require('./routes/index');
const dbConnect = require('./database/connection');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT;
const URI = process.env.CONNECTION_URI;

dbConnect(URI);

app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});