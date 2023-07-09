'use strict';

const { Account, Subscription } = require('../models');

exports.getRating = async (req, res) => {
  const accounts = await Account.findAll({
    order: ['balance_usd_sub']
  });
  res.send(accounts);
};

exports.subscribe = async (req, res) => {
  const { login, source, r_login, r_source } = req.body;
  if (!login || !source || !r_login || !r_source) {
    return res.status(400).send({
      message: `One of required parameters login, source, r_login, r_source is not passed`
    });
  }

  const subscription = await Subscription.findOne({
    where: { login, source, r_login, r_source }
  });
  if (subscription) return res.status(400).send({
    message: `Subscription is already created`
  });

  await Subscription.create({ login, source, r_login, r_source });
  res.sendStatus(201);
};

exports.unsubscribe = async (req, res) => {
  const { login, source, r_login, r_source } = req.body;
  if (!login || !source || !r_login || !r_source) {
    return res.status(400).send({
      message: `One of required parameters login, source, r_login, r_source is not passed`
    });
  }

  const subscription = await Subscription.findOne({
    where: { login, source, r_login, r_source }
  });
  if (!subscription) return res.status(404).send({
    message: `Subscription is not found`
  });

  await subscription.destroy();
  res.sendStatus(204);
};
