'use strict';

const createError = require('http-errors');

const { Subscription } = require('../models');

exports.subscribe = async ({ login, source, r_login, r_source }) => {
  const subscription = await Subscription.findOne({
    where: { login, source, r_login, r_source }
  });
  if (subscription) throw new createError.BadRequest('Subscription is already created');

  await Subscription.create({ login, source, r_login, r_source });
};

exports.unsubscribe = async ({ login, source, r_login, r_source }) => {
  const subscription = await Subscription.findOne({
    where: { login, source, r_login, r_source },
    rejectOnEmpty: new createError.NotFound('Subscription is not found')
  });

  await subscription.destroy();
};
