const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.MongoClient = MongoClient;
    req.DatabaseURI = config.getDatabaseURI();
    next();
});

/**
 * Setup API
 */
app.use('/api', api);

app.listen(config.getPort(), () => {
    console.info(`[i] Server is listening on port ${config.getPort()}`);
});
