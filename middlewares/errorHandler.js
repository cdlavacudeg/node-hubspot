const response = require('./../helpers/response');

class ErrorHandler {
  static logErrors(err, _req, _res, next) {
    console.error('[Error]', err);
    return next(err);
  }
  static errorHandler(err, req, res, _next) {
    const message = err.message || 'Internal server error';
    const statusCode = err.statusCode || 500;
    return response.error(req, res, message, statusCode);
  }
}

module.exports = ErrorHandler;
