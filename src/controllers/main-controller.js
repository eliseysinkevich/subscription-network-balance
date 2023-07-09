'use strict';

const { Account } = require('../models');

exports.getRating = async (req, res) => {
  const accounts = await Account.findAll({
    attributes: ['source', 'login', 'balance_usd', 'balance_usd_sub', 'subscribers_count'],
    order: ['balance_usd_sub']
  });
  res.send(accounts);
};

exports.subscribe = async (req, res) => {
  res.sendStatus(201);
};

exports.unsubscribe = async (req, res) => {
  res.sendStatus(204);
};
