'use strict';

const { HttpError } = require('http-errors');

// eslint-disable-next-line no-unused-vars
exports.handler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send(err);
  }

  console.error(err);
  res.status(500).send(err);
};
