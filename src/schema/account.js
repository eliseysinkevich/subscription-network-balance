'use strict';

const Joi = require('joi');

const { validateBigInt } = require('../utils');

const account = Joi.object({
  login: Joi.custom(validateBigInt, 'bigint')
    .required(),

  source: Joi.number()
    .required(),

  balance_usd: Joi.number()
    .positive()
    .precision(2)
    .required()
});

module.exports = account;
