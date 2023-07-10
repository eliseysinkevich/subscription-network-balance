const Joi = require('joi');

const { validateBigInt } = require('../utils');

const subscription = Joi.object({
  login: Joi.custom(validateBigInt, 'bigint')
    .required(),

  source: Joi.number()
    .positive()
    .required(),

  r_login: Joi.custom(validateBigInt, 'bigint')
    .required(),

  r_source: Joi.number()
    .positive()
    .required(),
});

module.exports = subscription;
