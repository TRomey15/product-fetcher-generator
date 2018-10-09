const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const isProd = process.env.NODE_ENV === 'production';

const indexRouter = require('./routes/index.js');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (isProd) {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(compression());
}

app.use('/', indexRouter);

module.exports = app;
