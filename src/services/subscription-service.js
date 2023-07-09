'use strict';

const createError = require('http-errors');

const accountService = require('./account-service');

const { sequelize, Subscription } = require('../models');

exports.subscribe = async ({ login, source, r_login, r_source }) => {
  const subscription = await Subscription.findOne({
    where: { login, source, r_login, r_source }
  });
  if (subscription) throw new createError.BadRequest('Subscription is already created');

  await sequelize.transaction(async (transaction) => {
    await Subscription.create({ login, source, r_login, r_source }, { transaction });
  });
};

exports.unsubscribe = async ({ login, source, r_login, r_source }) => {
  const subscription = await Subscription.findOne({
    where: { login, source, r_login, r_source },
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
