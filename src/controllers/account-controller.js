'use strict';

const accountService = require('../services/account-service');

exports.getRating = async (req, res) => {
  const accounts = await accountService.getRating();
  res.send(accounts);
};

exports.updateBalance = async (req, res) => {
  const { login, source, balance_usd } = req.body;
  if (!login || !source || !balance_usd) {
    return res.status(400).send({
      message: 'One of required parameters login, source, balance_usd is not passed'
    });
  }

  await accountService.updateBalance({ login, source, balance_usd });
  res.end();
};
