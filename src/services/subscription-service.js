'use strict';

const createError = require('http-errors');

const accountService = require('./account-service');

const { sequelize, Subscription } = require('../models');
const { Transaction } = require('sequelize');

/**
 * Create subscription
 * @param {Object} input - subscription
 * @param {BigInt} input.login - account
 * @param {number} input.source
 * @param {BigInt} input.r_login - account for subscription
 * @param {number} input.r_source
 */
exports.subscribe = async (input) => {
  const subscription = await Subscription.findOne({ where: input });
  if (subscription) throw new createError.BadRequest('Subscription is already created');

  await accountService.findOne({ login: input.login, source: input.source });
  await accountService.findOne({ login: input.r_login, source: input.r_source });

  await sequelize.transaction(async (transaction) => {
    await Subscription.create(input, { transaction });
  });
};

/**
 * Remove subscription
 * @param {Object} input - subscription
 * @param {BigInt} input.login - account
 * @param {number} input.source
 * @param {BigInt} input.r_login - account for subscription
 * @param {number} input.r_source
 */
exports.unsubscribe = async (input) => {
  const subscription = await Subscription.findOne({
    where: input,
    rejectOnEmpty: new createError.NotFound('Subscription is not found')
  });

  await sequelize.transaction(async (transaction) => {
    await subscription.destroy({ transaction });
  });
};

/**
 * 
 * @param {Object} subscription - subscription
 * @param {BigInt} subscription.login - account
 * @param {number} subscription.source
 * @param {BigInt} subscription.r_login - account for subscription
 * @param {number} subscription.r_source
 * @param {Object} options 
 * @param {Transaction} options.transaction
 */
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

// hooks for recalculating network balance and subscribers count after subscription created or removed
Subscription.addHook('afterCreate', recalculateNetwork);
Subscription.addHook('afterDestroy', recalculateNetwork);
