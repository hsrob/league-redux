import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
let champions = require('./routes/champions');
let _ = require('lodash');
let Promise = require('bluebird');

const app = express();
app.use(session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
}));
app.use(bodyParser.json());

export default function api() {
    return new Promise((resolve) => {
        app.use('/champions', champions);
        app.listen(config.apiPort);
        resolve();
    });
}
