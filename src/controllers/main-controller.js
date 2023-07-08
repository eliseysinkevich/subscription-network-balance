'use strict';

exports.getRating = async (req, res) => {
  res.end();
};

exports.subscribe = async (req, res) => {
  res.sendStatus(201);
};

exports.unsubscribe = async (req, res) => {
  res.sendStatus(204);
};
