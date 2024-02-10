var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var migrationRouter = require('./routes/migration');
var integrationRouter = require('./routes/integration');
const ErrorHandler = require('./middlewares/errorHandler');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/migration', migrationRouter);
app.use('/integration', integrationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// errorHandler
app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.errorHandler);

module.exports = app;
