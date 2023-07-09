'use strict';

const { Account } = require('../models');

exports.getRating = async (req, res) => {
  const accounts = await Account.findAll({
    order: ['balance_usd_sub']
  });
  res.send(accounts);
};
