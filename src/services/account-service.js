'use strict';

const createError = require('http-errors');

const { sequelize, Account } = require('../models');

exports.getRating = () => {
  return Account.findAll({ order: ['balance_usd_sub'] });
};

exports.updateBalance = async ({ login, source, balance_usd }) => {
  const account = await this.findOne({ login, source });

  await sequelize.transaction(async (transaction) => {
    await account.update({ balance_usd }, { transaction });
  });
};

exports.findOne = ({ login, source }) => {
  return Account.findOne({
    where: { login, source },
    rejectOnEmpty: new createError.NotFound('Account is not found')
  });
};

exports.recalculateNetwork = async ({ login, source }, { countSubscribers = false, transaction }) => {
  await sequelize.query(`WITH RECURSIVE a AS (
  SELECT login,
    source,
    balance_usd
  FROM account
  WHERE login = :login AND source = :source
  UNION
  SELECT b.login,
    b.source,
    b.balance_usd
  FROM a
    JOIN subscription s ON s.login = a.login AND s.source = a.source
    JOIN account b ON b.login = s.r_login AND b.source = s.r_source
),
b AS (
  SELECT a.login AS base_login,
    a.source AS base_source,
    a.login,
    a.source,
    a.balance_usd
  FROM a
  UNION
  SELECT b.base_login AS base_login,
    b.base_source AS base_source,
    c.login,
    c.source,
    c.balance_usd
  FROM b
    JOIN subscription s ON s.r_login = b.login AND s.r_source = b.source
    JOIN account c ON c.login = s.login AND c.source = s.source
)
UPDATE account c
  JOIN b ON c.login = b.base_login AND c.source = b.base_source
SET balance_usd_sub = (
    SELECT sum(b.balance_usd)
    FROM b
    WHERE c.login = b.base_login AND c.source = b.base_source
  ),
  subscribers_count = (
    SELECT COUNT(*)
    FROM b
    WHERE c.login = b.base_login AND c.source = b.base_source
  )`, {
    replacements: { login, source },
    transaction
  });
};

Account.addHook('afterUpdate', async (account, { transaction }) => {
  if (!account._changed.has('balance_usd')) return;
  await this.recalculateNetwork(account, { transaction });
});
