'use strict';

const createError = require('http-errors');

const accountService = require('./account-service');

const { sequelize, Subscription } = require('../models');

exports.subscribe = async (input) => {
  const subscription = await Subscription.findOne({ where: input });
  if (subscription) throw new createError.BadRequest('Subscription is already created');

  await accountService.findOne({ login: input.login, source: input.source });
  await accountService.findOne({ login: input.r_login, source: input.r_source });

  await sequelize.transaction(async (transaction) => {
    await Subscription.create(input, { transaction });
  });
};

exports.unsubscribe = async (input) => {
  const subscription = await Subscription.findOne({
    where: input,
    rejectOnEmpty: new createError.NotFound('Subscription is not found')
  });

  await sequelize.transaction(async (transaction) => {
    await subscription.destroy({ transaction });
  });
};

async function recalculateNetwork(subscription, { transaction }) {
  const account = await accountService.findOne({
    login: subscription.r_login,
    source: subscription.r_source,
  });
  await accountService.recalculateNetwork(account, {
    countSubscribers: true,
    transaction
  });
}

Subscription.addHook('afterCreate', recalculateNetwork);
Subscription.addHook('afterDestroy', recalculateNetwork);
