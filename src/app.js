'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
require('express-async-errors');

JSON = require('json-bigint')({ useNativeBigInt: true });

const errorService = require('./services/error-service');

const accountRouter = require('./routers/account-router');
const subscriptionRouter = require('./routers/subscription-router');

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '200kb' }));

app.use(accountRouter);
app.use(subscriptionRouter);
app.use(errorService.handler);

module.exports = app;
