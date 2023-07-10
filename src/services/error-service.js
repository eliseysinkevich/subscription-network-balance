'use strict';

const { HttpError } = require('http-errors');
const { ValidationError } = require('joi');

// eslint-disable-next-line no-unused-vars
exports.handler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send(err);
  }
  if (err instanceof ValidationError) {
    return res.status(400).send(err);
  }

  console.error(err);
  res.status(500).send(err);
};
