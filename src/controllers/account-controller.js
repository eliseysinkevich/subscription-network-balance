'use strict';

const accountService = require('../services/account-service');

const schema = require('../schema/account');

exports.getRating = async (req, res) => {
  const accounts = await accountService.getRating();
  res.send(accounts);
};

exports.updateBalance = async (req, res) => {
  const { error, value: account } = schema.validate(req.body);
  if (error) throw error;

  await accountService.updateBalance(account);
  res.end();
};
