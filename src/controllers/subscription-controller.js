'use strict';

const subscriptionService = require('../services/subscription-service');

exports.subscribe = async (req, res) => {
  const { login, source, r_login, r_source } = req.body;
  if (!login || !source || !r_login || !r_source) {
    return res.status(400).send({
      message: 'One of required parameters login, source, r_login, r_source is not passed'
    });
  }

  await subscriptionService.subscribe({ login, source, r_login, r_source });
  res.sendStatus(201);
};

exports.unsubscribe = async (req, res) => {
  const { login, source, r_login, r_source } = req.body;
  if (!login || !source || !r_login || !r_source) {
    return res.status(400).send({
      message: 'One of required parameters login, source, r_login, r_source is not passed'
    });
  }

  await subscriptionService.unsubscribe({ login, source, r_login, r_source });
  res.sendStatus(204);
};
