class Response {
  static success(_req, res, message, data = {}, status = 200) {
    res.status(status).send({
      statusCode: status,
      error: '',
      msg: message,
      data: data,
    });
  }

  static error(_req, res, message, status = 500) {
    res.status(status).send({
      statusCode: status,
      error: message,
      msg: '',
      data: {},
    });
  }
}

module.exports = Response;
