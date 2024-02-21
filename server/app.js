const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// API Version
const version = process.env.API_VERSION;

const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login.routes');
const signupRouter = require('./src/routes/signup.routes');
const securityRouter = require('./src/routes/security.routes');

const app = express();

app.set('trust proxy', 1) // TODO: Find out if this is needed
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`/${version}/`, indexRouter);
app.use(`/${version}/login`, loginRouter);
app.use(`/${version}/signup`, signupRouter);
app.use(`/${version}/security`, securityRouter);

module.exports = app;
