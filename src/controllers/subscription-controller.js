'use strict';

const subscriptionService = require('../services/subscription-service');

const schema = require('../schema/subscription');

exports.subscribe = async (req, res) => {
  const { error, value: subscription } = schema.validate(req.body);
  if (error) throw error;

  await subscriptionService.subscribe(subscription);
  res.sendStatus(201);
};

exports.unsubscribe = async (req, res) => {
  const { error, value: subscription } = schema.validate(req.body);
  if (error) throw error;

  await subscriptionService.unsubscribe(subscription);
  res.sendStatus(204);
};
