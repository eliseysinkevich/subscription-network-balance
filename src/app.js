'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
require('express-async-errors');

const router = require('./routers/main-router');

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '200kb' }));

app.use(router);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

module.exports = app;
